const express = require('express');
const router = express.Router();

// Import route modules
const authRouter = require('./authRouter');
const subscribeRouter = require('./subscribeRouter');

// Mount routes
router.use('/auth', authRouter);
router.use('/subscribe', subscribeRouter);

module.exports = router;