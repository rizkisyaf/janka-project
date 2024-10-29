const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Telegraf } = require('telegraf');
const WebSocket = require('ws');

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

const certPath = './X509-cert-1508285637655077492.pem';

mongoose.connect('mongodb+srv://cluster0.o1ajn.mongodb.net/?authSource=$external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0', {
  tls: true,
  tlsCertificateKeyFile: certPath,
  authMechanism: 'MONGODB-X509',
  authSource: '$external',
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
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

// Routes
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email } = req.body;
    const waitlistEntry = new Waitlist({ email });
    await waitlistEntry.save();
    res.status(201).json({ message: 'Successfully joined the waitlist' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists in the waitlist' });
    } else {
      res.status(500).json({ message: 'Error joining waitlist', error: error.message });
    }
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