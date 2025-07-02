const express = require('express');
const multer = require('multer');
const path = require('path');
const Publication = require('../../models/Publication');

const router = express.Router();

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

// @route POST /api/publications/add
router.post('/add', upload.single('cover'), async (req, res) => {
  try {
    const { title, genre, description, pages } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    const newPublication = new Publication({
      title,
      genre,
      description,
      pages,
      coverImage
    });

    await newPublication.save();
    res.status(201).json({ message: 'Publication added successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not add publication.' });
  }
});

module.exports = router;
