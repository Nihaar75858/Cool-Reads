const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    blogAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);
