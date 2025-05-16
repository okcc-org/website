const express = require('express');
const router = express.Router();

// Import route modules
const authRouter = require('./authRouter');
const subscribeRouter = require('./subscribeRouter');
const newsRouter = require('./newsRouter');
// Mount routes
router.use('/auth', authRouter);
router.use('/subscribe', subscribeRouter);
router.use('/news', newsRouter);

module.exports = router;