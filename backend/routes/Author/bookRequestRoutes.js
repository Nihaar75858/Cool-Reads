const express = require('express');
const router = express.Router();
const BookRequest = require('../../models/BookRequest');
const Notification = require('../../models/Notification');
const multerUpload = require('../../middleware/upload');
const { authenticate, authorizeRoles } = require('../../middleware/auth');

// Allow 'bookDocument' and 'bookCover' file fields
const cpUpload = multerUpload.fields([
  { name: 'bookDocument', maxCount: 1 },
  { name: 'bookCover', maxCount: 1 }
]);

// Send book to Admin
router.post('/request', authenticate, authorizeRoles("Author"), cpUpload, async (req, res) => {
  try {
    const { authorId, title, pages, isbn, dateAdded, abstract, genres } = req.body;
    const authorNames = req.body.authorNames instanceof Array
      ? req.body.authorNames
      : [req.body.authorNames];

    const bookDocument = req.files['bookDocument']?.[0]?.path;
    const bookCover = req.files['bookCover']?.[0]?.path;

    if (!bookDocument || !bookCover) {
      return res.status(400).json({ success: false, message: 'Files missing' });
    }

    const newBookRequest = new BookRequest({
      authorId,
      title,
      pages,
      isbn,
      dateAdded,
      abstract,
      authorNames,
      genres,
      bookDocument,
      bookCover,
      status: 'pending'
    });
    await newBookRequest.save();

    const notification = new Notification({
      type: 'BookRequest',
      message: `Author ${authorNames} requested publishing: ${title}`,
      recipientRole: 'Admin',
      bookId: newBookRequest._id,
      authorId: authorId,
      read: false,
      date: new Date(),
      status: 'Pending',
    });

    await notification.save();

    res.status(201).json({ success: true, message: 'Book request submitted to admin' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Find accepted books based on Author Id
router.get('/author/:id', authenticate, async (req, res) => {
  try {
    const requests = await BookRequest.find({ status: 'accepted' });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Notify the Author by Id
router.get('/author/notifs/:id', authenticate, authorizeRoles("Admin"), async (req, res) => {
  try {
    const authorId = req.params.id;

    const notifications = await Notification.find({
      recipientRole: 'Author',
      authorId: authorId   // <- filter by the user ID too
    });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
