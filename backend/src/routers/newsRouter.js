const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { getNews, getNewsById, createNews, updateNews, deleteNews } = require('../controllers/newsController');

// Get all news
router.get('/', getNews);

// Get news by id
router.get('/:id', getNewsById);

// Create news with multiple images
router.post('/', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'contents[][image]', maxCount: 10 }  // Handle images in contents array
]), createNews);

// Update news with multiple images
router.put('/:id', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'contents[][image]', maxCount: 10 }
]), updateNews);

// Delete news
router.delete('/:id', deleteNews);

module.exports = router;
