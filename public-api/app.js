// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const publicRoutes = require('./routes/public');
require('dotenv').config();
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());

app.use('/api', publicRoutes);

app.listen(4000, () => {
  console.log('Public API running on port 4000');
});
