const mongoose = require('mongoose');

const BookRequestSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: String,
  authorNames: [String],
  pages: String,
  isbn: String,
  dateAdded: Date,
  abstract: String,
  genres: [String], // Array of genres
  bookDocument: String,
  bookCover: String,
  status: {
    type: String,
    default: 'pending'
  }
});

module.exports = mongoose.model('BookRequest', BookRequestSchema);
