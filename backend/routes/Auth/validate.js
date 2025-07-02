const express = require('express');
const router = express.Router();
const User = require('../../models/Register');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName: req.body.firstName.trim().replace(/,$/, ""),
      lastName: req.body.lastName.trim().replace(/,$/, ""),
      email: req.body.email.trim().replace(/,$/, ""),
      password: hashedPassword,
      role: req.body.role.trim().replace(/,$/, "") || 'User'
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Incorrect password' });

    // ✅ Send back user ID and role
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;
