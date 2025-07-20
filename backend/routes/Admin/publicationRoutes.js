const express = require('express');
const multer = require('multer');
const path = require('path');
const Publication = require('../../models/Publication');
const { console } = require('inspector');

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

router.get('/view', async (req, res) => {
  try {
    const publications = await Publication.find();
    console.log("Publications:", publications);
    res.status(200).json(publications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not retrieve publications.' });
  }
});

// Accept a book request and create a publication
router.put('/accept/:id', async (req, res) => {
  try {
    // 1. Update the book request status
    const updatedRequest = await Publication.findByIdAndUpdate(
      req.params.id,
      { status: 'published' },
      { new: true }
    );

    console.log("Updated Request:", updatedRequest);

    const newPublication = new Publication({
      title: updatedRequest.title,
      author: updatedRequest.authorNames.join(', '),
      pages: updatedRequest.pages,
      isbn: updatedRequest.isbn,
      publishedDate: new Date(),
      abstract: updatedRequest.abstract,
      bookDocument: updatedRequest.bookDocument,
      bookCover: updatedRequest.bookCover,
      status: 'published',
      // authorId: updatedRequest.authorId, // ✅ include authorId
    });

    await newPublication.save();

    // 3. Send both updated request and new publication
    res.json({
      message: 'Book accepted and added to publications',
      updatedRequest,
      publication: newPublication,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
