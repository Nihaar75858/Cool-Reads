const express = require('express');
const router = express.Router();
const Comment = require('./../../models/Comment');
const Blog = require('./../../models/Blog'); // Assuming you have a Blog model
const Notification = require('./../../models/Notification');

// GET comments for a blog
router.get('/:blogId', async (req, res) => {
    try {
        const comments = await Comment.find({ blogId: req.params.blogId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new comment
router.post('/:id', async (req, res) => {
    try {
        const blogId = req.params.id; // Get blogId from URL parameter
        const { content, commenterId, recipientRole, authorName } = req.body;

        // Validate required fields
        if (!content || !commenterId) {
            return res.status(400).json({ message: "Content and commenterId are required" });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // Create comment (this already saves to database, no need for .save())
        const comment = await Comment.create({
            blogId: blogId,
            commenter: commenterId,
            content,
        });

        // Save a notification for the author
        await Notification.create({
            type: 'Comment',
            message: `${authorName} just commented on your blog "${blog.title}"`,
            recipientRole,
            authorId: blog.authorId, // Use blog.authorId, not blog.id
            read: false,
            date: new Date(),
            status: 'Commented',
        });

        // Return the comment, not the notification
        res.status(201).json(comment);
    } catch (err) {
        console.error('Comment creation error:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
