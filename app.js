require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const drugsRouter = require('./routes/drugs');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Cache the connection across serverless invocations
let isConnected = false;

async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGO_URI);
  isConnected = true;
  console.log('Connected to MongoDB Atlas');
}

// Ensure DB is connected before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/drugs', drugsRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

app.get('/privacy', (req, res) => {
  res.sendFile(__dirname + '/views/privacy.html');
});

// Local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
