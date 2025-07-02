const express = require('express');
const router = express.Router();
const Comment = require('./../../models/Comment');
const Blog = require('./../../models/Blog'); // Assuming you have a Blog model
const User = require('./../../models/Users'); // Assuming you have a User model

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
router.post('/:blogId', async (req, res) => {
    try {
        const { blogId, content, commenterId } = req.body;

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const comment = await Comment.create({
            blogId,
            content,
            commenter: commenterId,
            blogAuthor: blog.authorId, // assuming the blog has this field
        });

        // Save a notification for the author
        await Notification.create({
            userId: blog.authorId,
            message: `${req.user.firstName} just commented on your blog "${blog.title}"`,
            link: `/blog/${blogId}`,
            isRead: false,
        });

        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
