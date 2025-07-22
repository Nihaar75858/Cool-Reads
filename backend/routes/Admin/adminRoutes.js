const express = require('express');
const router = express.Router();
const BookRequest = require('../../models/BookRequest');
const User = require('../../models/Users');
const Publication = require('../../models/Publication');
const Blog = require('../../models/Blog'); // Assuming blogs are stored in Blog model
const { authenticate, authorizeRoles } = require('../../middleware/auth');
const Notification = require('../../models/Notification');

// Get the count of users
router.get('/users', async (req, res) => {
  try {
    const userCount = await User.find();
    res.json({ count: userCount.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get the count of books
router.get('/bookcount', async (req, res) => {
  try {
    const bookCount = await Publication.find();
    res.json({ count: bookCount.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get the count of blogs
router.get('/blogcount', async (req, res) => {
  try {
    const blogCount = await Blog.find(); // Assuming blogs are stored in BookRequest
    res.json({ count: blogCount.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all books
router.get('/books', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const books = await BookRequest.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/notifs', async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientRole: 'Admin' }).populate('authorId').sort({ date: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find requests
router.get('/request', async (req, res) => {
  try {
    const requests = await BookRequest.find({ status: 'pending' });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept a book request and create a publication
router.put('/accept/:id', async (req, res) => {
  try {
    // 1. Update the book request status
    const updatedRequest = await BookRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted' },
      { new: true }
    );

    console.log("Updated Request:", updatedRequest);

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Book request not found' });
    }

    // 2. Create a new publication from the book request
    const newPublication = new Publication({
      title: updatedRequest.title,
      authors: updatedRequest.authorNames.join(', '),
      pages: updatedRequest.pages,
      isbn: updatedRequest.isbn,
      publishedDate: new Date(),
      abstract: updatedRequest.abstract,
      genres: updatedRequest.genres,
      bookDocument: updatedRequest.bookDocument,
      bookCover: updatedRequest.bookCover,
      authorId: updatedRequest.authorId,
      status: 'published',
    });

    await newPublication.save();

    const notification = new Notification({
      type: 'Publication',
      message: `Congralulations, your book '${newPublication.title}' has been published successfully on ${newPublication.publishedDate}!`,
      recipientRole: 'Author',
      bookId: newPublication._id,
      authorId: updatedRequest.authorId,
      read: false,
      date: new Date(),
      status: 'Published',
    });

    await notification.save();

    // 3. Send both updated request and new publication
    res.json({
      message: 'Book accepted and added to publications',
      updatedRequest,
      publication: newPublication,
      notification,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
