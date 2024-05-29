// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const password_hash = await bcrypt.hash(password, 10);
  const user = new User({ first_name, last_name, email, password_hash });
  user.generateApiKey(); // Generate API key
  await user.save();
  res.status(201).send({ message: 'User registered successfully', api_key: user.api_key });
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password_hash)) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, 'secret_key');
  res.send({ token, api_key: user.api_key });
});

// Protected endpoint
router.post('/protected', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret_key');
    res.send({ message: 'Access granted', user: decoded });
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
});

// routes/auth.js (continued)
router.get('/apikey', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, 'secret_key');
      const user = await User.findById(decoded.id);
      res.send({ api_key: user.api_key });
    } catch (error) {
      res.status(401).send({ message: 'Invalid token' });
    }
  });
  

module.exports = router;
