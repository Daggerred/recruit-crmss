// routes/public.js
const express = require('express');
const User = require('../models/User');
const Candidate = require('../models/Candidate');
const router = express.Router();

// Middleware to authenticate with API key
const authenticateWithApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const user = await User.findOne({ api_key: apiKey });
  if (!user) {
    return res.status(401).send({ message: 'Invalid API key' });
  }
  req.user = user;
  next();
};

// Get user profile
router.post('/public/profile', authenticateWithApiKey, async (req, res) => {
  res.send(req.user);
});

// Get candidates for the user
router.get('/public/candidate', authenticateWithApiKey, async (req, res) => {
  const candidates = await Candidate.find({ user_id: req.user._id });
  res.send(candidates);
});

module.exports = router;
