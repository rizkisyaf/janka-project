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

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI must be provided');
}

// Replace the certificate handling with environment variable
const certContent = process.env.MONGODB_CERTIFICATE;
let certPath;

if (certContent) {
  certPath = path.join(process.cwd(), 'cert.pem');
  fs.writeFileSync(certPath, certContent);
}

mongoose.connect(process.env.MONGODB_URI, {
  tlsCertificateKeyFile: certPath,
  retryWrites: true,
  w: 'majority',
  serverSelectionTimeoutMS: 15000,
}).then(() => {
  console.log('Connected to MongoDB');
  // Start server only after successful MongoDB connection
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
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
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check for existing email
    const existingUser = await Waitlist.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists in the waitlist' });
    }

    // Save to database
    const waitlistEntry = new Waitlist({ email });
    await waitlistEntry.save();

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

    res.status(201).json({ message: 'Successfully joined the waitlist' });
  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({ success: false, message: 'Error joining waitlist' });
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

app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    const totalDonations = donations.reduce((acc, curr) => acc + curr.amount, 0);
    const donorCount = donations.length;
    
    res.json({
      totalDonations,
      donorCount
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Internal server error' });
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