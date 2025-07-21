const express = require('express');
const router = express.Router();
const multer = require('multer');
const BookRequest = require('../../models/BookRequest');

// Configure multer with memory storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Allow 'bookDocument' and 'bookCover' file fields
const cpUpload = upload.fields([
  { name: 'bookDocument', maxCount: 1 },
  { name: 'bookCover', maxCount: 1 }
]);

router.post('/request', cpUpload, async (req, res) => {
  try {
    const { title, pages, isbn, dateAdded, abstract } = req.body;
    const authorNames = req.body.authorNames instanceof Array
      ? req.body.authorNames
      : [req.body.authorNames];

    const bookDocument = req.files['bookDocument']?.[0]?.path;
    const bookCover = req.files['bookCover']?.[0]?.path;

    if (!bookDocument || !bookCover) {
      return res.status(400).json({ success: false, message: 'Files missing' });
    }

    const newBookRequest = new BookRequest({
      title,
      pages,
      isbn,
      dateAdded,
      abstract,
      authorNames,
      bookDocument,
      bookCover,
      status: 'pending'
    });
    await newBookRequest.save();

    const notification = new Notification({
      type: 'BookRequest',
      message: `Author ${req.user.firstName} ${req.user.lastName} requested publishing: ${title}`,
      recipientRole: 'Admin',
      bookId: newBook._id,
      authorId: authorId,
      read: false,
      date: new Date(),
    });

    await notification.save();

    res.status(201).json({ success: true, message: 'Book request submitted to admin' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/author/:id', async (req, res) => {
  try {
    const requests = await BookRequest.find({ status: 'accepted' });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
