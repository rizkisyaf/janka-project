const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Telegraf } = require('telegraf');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Telegram bot setup
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.launch();

// Models
const Waitlist = mongoose.model('Waitlist', {
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Newsletter = mongoose.model('Newsletter', {
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Donation', {
  amount: { type: Number, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now },
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
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const donorCount = await Donation.countDocuments();

    res.json({
      totalDonations: totalDonations[0]?.total || 0,
      donorCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation data', error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
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