const mongoose = require('mongoose');

const BookRequestSchema = new mongoose.Schema({
  title: String,
  authorNames: [String],
  pages: String,
  isbn: String,
  dateAdded: Date,
  abstract: String,
  bookDocument: String,
  bookCover: String,
  status: {
    type: String,
    default: 'pending'
  }
});

module.exports = mongoose.model('BookRequest', BookRequestSchema);
