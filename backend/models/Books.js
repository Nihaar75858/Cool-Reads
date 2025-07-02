const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authorNames: {
        type: [String],
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    // genre: {
    //     type: String,
    //     required: true
    // },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    abstract: {
        type: String,
        required: true
    },
    bookDocument: {
        type: String, // GridFS filename
        required: true
    },
    bookCover: {
        type: String,     // GridFS filename
        required: true
    },
    status: {
        type: String
    },
});

module.exports = mongoose.model('Book', BookSchema);