// routes/candidate.js
const express = require('express');
const Candidate = require('../models/Candidate');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to authenticate and get the user
const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};

// Add candidate
router.post('/candidate', authenticate, async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const candidate = new Candidate({ first_name, last_name, email, user_id: req.user.id });
  await candidate.save();
  res.status(201).send({ message: 'Candidate added successfully' });
});

// Get candidates
router.get('/candidate', authenticate, async (req, res) => {
  const candidates = await Candidate.find({ user_id: req.user.id });
  res.send(candidates);
});

module.exports = router;
