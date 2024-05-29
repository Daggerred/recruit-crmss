// models/User.js
const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  password_hash: String,
  api_key: { type: String, unique: true }
});

// Function to generate API key
userSchema.methods.generateApiKey = function() {
  this.api_key = crypto.randomBytes(20).toString('hex');
};

module.exports = mongoose.model('User', userSchema);
