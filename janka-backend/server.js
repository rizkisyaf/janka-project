const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { Telegraf } = require('telegraf');
const WebSocket = require('ws');
const fs = require('fs');
const validator = require('validator');
const nodemailer = require('nodemailer');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);

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
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// MongoDB connection setup
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI must be provided');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  monitorCommands: true,
});

// Add debug event listener
client.on('commandStarted', (event) => console.debug('MongoDB Command Started:', event));
client.on('commandSucceeded', (event) => console.debug('MongoDB Command Succeeded:', event));
client.on('commandFailed', (event) => console.debug('MongoDB Command Failed:', event));

async function connectToMongo() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    return client.db();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Initialize database connection before starting server
connectToMongo()
  .then((database) => {
    app.locals.db = database;
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
    await client.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});

// Telegram bot setup
if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN must be provided');
}
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.launch();

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
  amount: { type: Number, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const Donation = mongoose.model('Donation', donationSchema);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
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
      subject: 'Welcome to Janka Waitlist!',
      html: `
        <h1>Welcome to Janka!</h1>
        <p>Thank you for joining our waitlist. We're excited to have you on board!</p>
        <p>We'll keep you updated on our progress and let you know when we launch.</p>
        <br>
        <p>Best regards,</p>
        <p>The Janka Team</p>
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
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.post('/api/newsletter', async (req, res) => {
  try {
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

app.post('/api/donations', async (req, res) => {
  try {
    const { amount, message } = req.body;
    const donation = new Donation({ amount, message });
    await donation.save();

    // Send message to Telegram group
    if (!process.env.TELEGRAM_GROUP_ID) {
      throw new Error('TELEGRAM_GROUP_ID must be provided');
    }
    await bot.telegram.sendMessage(process.env.TELEGRAM_GROUP_ID, 
      `New donation received: $${amount}\nMessage: ${message || 'No message'}`
    );

    res.status(201).json({ message: 'Donation received successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing donation', error: error.message });
  }
});

// @ts-ignore
app.get('/api/donations', async (req, res) => {
  try {
    // Add connection check
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    const donations = await Donation.find().lean();
    
    if (!donations) {
      return res.status(200).json({
        totalDonations: 0,
        donorCount: 0
      });
    }

    const totalDonations = donations.reduce((acc, curr) => acc + curr.amount, 0);
    const donorCount = donations.length;
    
    res.json({
      totalDonations,
      donorCount,
      success: true
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    // Send more detailed error response
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: error.message,
      // Only include stack trace in development
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  bot.stop('SIGINT');
  process.exit();
});

process.on('SIGTERM', () => {
  bot.stop('SIGTERM');
  process.exit();
});

// Add this after your routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Add 404 handler
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

// Graceful shutdown
process.on('SIGTERM', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});

// Add connection options for better security
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4,
  retryWrites: true,
  w: 1,
  authSource: 'admin',
  connectTimeoutMS: 30000,
};

// @ts-ignore
mongoose.connect(process.env.MONGODB_URI, options)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Add connection monitoring
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = app;