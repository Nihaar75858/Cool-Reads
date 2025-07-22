const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    isbn: {
        type: Number,
        required: true
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    abstract: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    bookDocument: {
        type: String,
        required: true
    },
    bookCover: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Users',
        required: true
    },
    status: {
        type: String,
        enum: 'published',
        default: 'draft'
    }
});

module.exports = mongoose.model('Publications', PublicationSchema);
