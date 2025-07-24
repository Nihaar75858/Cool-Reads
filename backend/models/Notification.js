// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: String,          // e.g., 'BookRequest'
  message: String,
  recipientRole: String, // e.g., 'Admin'
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'BookRequest', required: false },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  read: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Published', 'Rejected', 'Pending', 'Replied'], default: 'Pending' },
});

module.exports = mongoose.model('Notification', notificationSchema);
