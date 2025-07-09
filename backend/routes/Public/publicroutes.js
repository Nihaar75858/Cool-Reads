const express = require('express');
const router = express.Router();
const Publication = require('../../models/Publication');

router.get('/pubbooks', async (req, res) => {
    try {
        const books = await Publication.find({ status: 'published' })
            .select('title abstract bookCover');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;