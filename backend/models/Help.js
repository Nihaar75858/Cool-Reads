const mongoose = require('mongoose');

const helpRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', default: null }
});

module.exports = mongoose.model('HelpRequest', helpRequestSchema);
