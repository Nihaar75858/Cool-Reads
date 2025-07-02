const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Author', 'Viewer'],
        default: 'User',
    }
});

module.exports = mongoose.model('Users', RegisterSchema);
