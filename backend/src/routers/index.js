const express = require('express');
const router = express.Router();

// Import route modules
const authRouter = require('./authRouter');
const subscribeRouter = require('./subscribeRouter');
const newsRouter = require('./newsRouter');
const userRouter = require('./userRouter');

// Mount routes
router.use('/auth', authRouter);
router.use('/subscribe', subscribeRouter);
router.use('/news', newsRouter);
router.use('/user', userRouter);

module.exports = router;