const express = require('express');
const router = express.Router();

// Import route modules
const authRouter = require('./authRouter');

// Mount routes
router.use('/auth', authRouter);

module.exports = router; 