const mongoose = require('mongoose');

const helpRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: Date,
  read: Boolean
});

module.exports = mongoose.model('HelpRequest', helpRequestSchema);
