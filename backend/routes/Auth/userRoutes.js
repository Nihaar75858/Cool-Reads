const express = require("express");
const router = express.Router();
const User = require("../../models/Users");

// Fetch user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

module.exports = router;
