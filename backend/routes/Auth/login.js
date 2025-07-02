const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/Users');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ success: true, message: "Login successful", user });
    } catch (err) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
});
