const express = require("express");
const router = express.Router();
const User = require("../../models/Users");
const { authenticate } = require("../../middleware/auth");

// Fetch user by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

module.exports = router;
