const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// @ts-ignore
const path = require('path');
const { Telegraf } = require('telegraf');
const WebSocket = require('ws');
// @ts-ignore
const fs = require('fs');
const validator = require('validator');
const nodemailer = require('nodemailer');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

// MongoDB connection setup
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI must be provided');
}
// Telegram bot setup
if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN must be provided');
}
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.launch();
if (!process.env.TELEGRAM_GROUP_ID) {
  throw new Error('TELEGRAM_GROUP_ID must be provided');
}
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  throw new Error('SMTP credentials must be provided');
}

const app = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
// Create WebSocket server
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://janka-project.vercel.app']
    : ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add request logging middleware
// @ts-ignore
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  retryWrites: true,
  w: 'majority',
  replicaSet: 'atlas-xh3z3h-shard-0',
  authSource: 'admin',
  directConnection: false,
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  monitorCommands: true,
});

// Add debug event listener
client.on('commandStarted', (event) => console.debug('MongoDB Command Started:', event));
client.on('commandSucceeded', (event) => console.debug('MongoDB Command Succeeded:', event));
client.on('commandFailed', (event) => console.debug('MongoDB Command Failed:', event));

// Add connection options for better security
const mongooseOptions = {
  retryWrites: true,
  w: 1,
  replicaSet: 'atlas-xh3z3h-shard-0',
  authSource: 'admin',
  directConnection: false,
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  bufferCommands: true,
  autoCreate: false,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4
};

async function connectToMongo() {
  try {
    if (!uri) {
      throw new Error('MONGODB_URI must be provided');
    }

    const MAX_RETRIES = 3;
    let retryCount = 0;

    while (retryCount < MAX_RETRIES) {
      try {
        // Connect MongoDB client
        await client.connect();
        const db = client.db();
        await db.command({ ping: 1 });

        // Connect Mongoose and wait for it to be ready
        await mongoose.connect(uri, mongooseOptions);

        // Wait for connection to be ready
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Mongoose connection timeout'));
          }, 5000);

          mongoose.connection.once('connected', () => {
            clearTimeout(timeout);
            resolve(undefined);
          });
        });

        console.log("Successfully connected to MongoDB!");
        return db;
      } catch (error) {
        retryCount++;
        console.error(`MongoDB connection attempt ${retryCount} failed:`, error);

        if (retryCount === MAX_RETRIES) {
          throw new Error(`Failed to connect after ${MAX_RETRIES} attempts`);
        }

        await new Promise(resolve =>
          setTimeout(resolve, Math.pow(2, retryCount) * 1000)
        );
      }
    }
  } catch (error) {
    console.error("Final MongoDB connection error:", error);
    throw error;
  }
}

// Models
const waitlistSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});
const Waitlist = mongoose.model('Waitlist', waitlistSchema);

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0,
    comment: 'Amount in SOL'
  },
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const Donation = mongoose.model('Donation', donationSchema);

const feedbackSchema = new mongoose.Schema({
  questionId: { type: Number, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  customAnswer: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

async function waitForConnection(maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    if (isDbConnected()) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return false;
}

// Initialize database connection before starting server
connectToMongo()
  .then((database) => {
    app.locals.db = database;

    // Define routes here
    // @ts-ignore
    app.post('/api/feedback', async (req, res) => {
      try {
        if (!await waitForConnection()) {
          throw new Error('Database connection not ready');
        }
        const { answers } = req.body;

        // Validate answers
        if (!Array.isArray(answers)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid feedback format'
          });
        }

        // Save each answer
        const savedFeedback = await Promise.all(
          answers.map(async (answer) => {
            const feedback = new Feedback({
              questionId: answer.questionId,
              question: answer.question,
              answer: answer.answer,
              customAnswer: answer.customAnswer
            });
            return await feedback.save();
          })
        );

        // Send notification to Telegram
        const telegramMessage = `📊 New Feedback Received!\n\n${answers.map(a =>
          `Q: ${a.question}\nA: ${a.customAnswer || a.answer}`
        ).join('\n\n')
          }`;

        try {
          await bot.telegram.sendMessage(
            String(process.env.TELEGRAM_GROUP_ID),
            telegramMessage,
            { parse_mode: 'HTML' }
          );
        } catch (telegramError) {
          console.error('Failed to send Telegram notification:', telegramError);
        }

        res.status(201).json({
          success: true,
          message: 'Feedback received successfully',
          data: savedFeedback
        });
      } catch (error) {
        console.error('Feedback error:', error);
        res.status(500).json({
          success: false,
          message: 'Error processing feedback',
          error: process.env.NODE_ENV === 'production' ? undefined : error.message
        });
      }
    });

    app.post('/api/newsletter', async (req, res) => {
      try {
        if (!await waitForConnection()) {
          throw new Error('Database connection not ready');
        }
        const { email } = req.body;
        const newsletterEntry = new Newsletter({ email });
        await newsletterEntry.save();
        res.status(201).json({ message: 'Successfully subscribed to the newsletter' });
      } catch (error) {
        if (error.code === 11000) {
          res.status(400).json({ message: 'Email already subscribed to the newsletter' });
        } else {
          res.status(500).json({ message: 'Error subscribing to newsletter', error: error.message });
        }
      }
    });

    // @ts-ignore
    app.get('/api/donations', async (req, res) => {
      try {
        if (!await waitForConnection()) {
          throw new Error('Database connection not ready');
        }

        const donations = await Donation.find().lean();

        if (!donations) {
          return res.status(200).json({
            totalDonations: 0,
            donorCount: 0,
            targetAmount: 200,
            currency: 'SOL',
            success: true
          });
        }

        const totalDonations = donations.reduce((acc, curr) => acc + curr.amount, 0);
        const donorCount = donations.length;
        const targetAmount = 200;
        const progressPercentage = (totalDonations / targetAmount) * 100;

        res.json({
          totalDonations,
          donorCount,
          targetAmount,
          progressPercentage,
          currency: 'SOL',
          success: true
        });
      } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          message: error.message,
          stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
        });
      }
    });

    // Error handlers should also be inside
    // @ts-ignore
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? undefined : err.message
      });
    });

    // @ts-ignore
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    });

    // Start server only after routes are defined
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Update the graceful shutdown handler
process.on('SIGINT', async () => {
  try {
    bot.stop('SIGINT');
    await Promise.all([
      client.close(),
      mongoose.connection.close()
    ]);
    console.log('Database connections closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  try {
    bot.stop('SIGTERM');
    await Promise.all([
      client.close(),
      mongoose.connection.close()
    ]);
    console.log('Database connections closed');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// @ts-ignore
app.post('/api/waitlist', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection not ready');
    }
    
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Check for existing email in waitlist
    const existingUser = await Waitlist.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists in the waitlist'
      });
    }

    // Save to waitlist
    const waitlistEntry = new Waitlist({ email });
    await waitlistEntry.save();

    // Try to save to newsletter, ignore if already exists
    try {
      const newsletterEntry = new Newsletter({ email });
      await newsletterEntry.save();
    } catch (newsletterError) {
      // Ignore duplicate key errors for newsletter
      if (newsletterError.code !== 11000) {
        console.error('Newsletter subscription error:', newsletterError);
      }
    }

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to the Future of Insurance with Janka! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://janka-project.vercel.app/janka-logo.svg" alt="Janka Logo" style="width: 80px; height: 80px;">
            </div>
            
            <h1 style="color: #2563eb; text-align: center; margin-bottom: 25px;">Welcome to the Janka Journey!</h1>
            
            <p style="margin-bottom: 15px;">Dear Future Partner,</p>
            
            <p style="margin-bottom: 15px;">I'm Fistya, the founder of Janka, and I'm thrilled to personally welcome you to our waitlist. Three years ago, as a cafe owner, I witnessed firsthand how unexpected events could devastate small businesses. That experience sparked a vision that became Janka.</p>
            
            <p style="margin-bottom: 15px;">We're building something revolutionary: a blockchain-powered insurance platform that provides instant, event-based coverage for businesses like yours. No more lengthy claims processes or rigid policies – just smart, flexible protection when you need it.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h2 style="color: #2563eb; margin-top: 0;">What's Next?</h2>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;">✨ You'll be among the first to access our platform</li>
                <li style="margin-bottom: 10px;">🎯 Exclusive early-adopter benefits</li>
                <li style="margin-bottom: 10px;">📫 Regular updates on our development progress</li>
              </ul>
            </div>
            
            <p style="margin-bottom: 20px;">Your trust in Janka means everything to us. We're working tirelessly to revolutionize the insurance industry, making it work better for businesses like yours.</p>
            
            <p style="margin-bottom: 15px;">Have questions? Feel free to reach out. I'd love to hear your story and how Janka can help protect your business.</p>
            
            <p style="margin-bottom: 25px;">Together, we're building the future of insurance.</p>
            
            <div style="margin-top: 30px;">
              <p style="margin-bottom: 5px;">Best regards,</p>
              <p style="font-weight: bold; margin-bottom: 5px;">Fistya</p>
              <p style="color: #6b7280; font-style: italic;">Founder, Janka</p>
            </div>
            
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 0.875rem;">Follow my journey:</p>
              <div style="margin-top: 10px;">
                <a href="https://twitter.com/kisra_fistya" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Twitter</a>
              </div>
            </div>
          </body>
        </html>
      `
    });

    res.status(201).json({
      success: true,
      message: 'Successfully joined the waitlist and subscribed to newsletter'
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error joining waitlist',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
});

// @ts-ignore
app.post('/api/donations', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection not ready');
    }

    const { amount, message } = req.body;

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid donation amount'
      });
    }

    const donation = new Donation({ amount, message });
    await donation.save();

    // Format the message
    const telegramMessage = `🎉 New Donation Received!\n\n` +
      `Amount: ${amount} SOL\n` +
      `Message: ${message || 'No message'}\n` +
      `Time: ${new Date().toISOString()}`;

    try {
      await bot.telegram.sendMessage(String(process.env.TELEGRAM_GROUP_ID), telegramMessage, {
        parse_mode: 'HTML',
        disable_notification: false
      });
    } catch (telegramError) {
      // Log the error but don't fail the donation
      console.error('Failed to send Telegram notification:', telegramError);
      // Continue processing the donation
    }

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'donation',
          amount: amount,
          currency: 'SOL'
        }));
      }
    });

    res.status(201).json({
      success: true,
      message: 'Donation received successfully',
      amount: amount,
      currency: 'SOL'
    });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing donation',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
});

// Add this after your routes
// @ts-ignore
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

// Add 404 handler
// @ts-ignore
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Add robust error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Application specific logging, throwing an error, or other logic here
  process.exit(1);
});

// Add these new event handlers (after line 520)
mongoose.connection.on('connecting', () => {
  console.log('Mongoose connecting to MongoDB...');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
  if (err.name === 'MongoServerSelectionError') {
    console.log('Attempting to reconnect...');
    connectToMongo().catch(console.error);
  }
});

// Add connection monitoring
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = app;