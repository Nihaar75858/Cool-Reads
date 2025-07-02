const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
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
    bookDocument: {
        type: String,
        required: true
    },
    bookCover: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: 'published',
        default: 'draft'
    }
    // authorId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }

});

module.exports = mongoose.model('Publications', PublicationSchema);
