const express = require('express');
const router = express.Router();  
const Notification = require('../../models/Notification');

// routes/notifications.js
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

module.exports = router;