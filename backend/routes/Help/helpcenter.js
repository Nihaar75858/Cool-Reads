const express = require('express');
const router = express.Router();
const HelpRequest = require('../../models/Help'); // Adjust the path as necessary

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, userId } = req.body;

    // Store it in your DB — maybe in a HelpRequest model:
    const helpRequest = new HelpRequest({
      name,
      email,
      subject,
      message,
      date: new Date(),
      read: false,
      userId
    });

    await helpRequest.save();

    res.status(201).json({ message: 'Help request submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
