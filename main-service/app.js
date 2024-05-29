// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const candidateRoutes = require('./routes/candidate');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', candidateRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
