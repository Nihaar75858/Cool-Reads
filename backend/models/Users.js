const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:
        String,
    lastName:
        String, 
    email:
        String,
    password:
        String,
    profilePic:
        String,
    role: {
        type: String,
        enum: [
            'Author',
            'Viewer'
        ], 
        default: 'User'
    }
});

module.exports = mongoose.models.Users || mongoose.model('Users', userSchema);
