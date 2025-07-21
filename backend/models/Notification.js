// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: String,          // e.g., 'BookRequest'
  message: String,
  recipientRole: String, // e.g., 'Admin'
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'BookRequest' },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  read: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
