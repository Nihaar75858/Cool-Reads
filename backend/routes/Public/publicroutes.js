const express = require('express');
const router = express.Router();
const Publication = require('../../models/Publication');

router.get('/', async (req, res) => {
    try {
        const books = await Publication.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});