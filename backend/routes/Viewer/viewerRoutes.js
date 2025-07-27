const express = require('express');
const router = express.Router();
const Book = require('../../models/Books'); // Adjust path if needed
const Publication = require('../../models/Publication');

router.get('/books', async (req, res) => {
  try {
    const books = await Publication.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/books/clone/:bookId
router.post('/clone/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const user = req.user; // Make sure this comes from auth middleware

    const originalBook = await Book.findById(bookId);
    if (!originalBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const clonedBook = new Book({
      title: originalBook.title,
      authorNames: [user.firstName + " " + user.lastName],
      pages: originalBook.pages,
      isbn: originalBook.isbn,
      dateAdded: new Date(),
      abstract: originalBook.abstract,
      bookDocument: originalBook.bookDocument,
      bookCover: originalBook.bookCover,
      status: 'published' // or 'accepted', based on your logic
    });

    await clonedBook.save();

    res.status(201).json({ message: 'Book added to your collection', book: clonedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/notifs/:id', async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientRole: 'Viewer' });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;