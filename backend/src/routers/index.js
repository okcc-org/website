const express = require('express');
const router = express.Router();

// Import route modules
const authRouter = require('./authRouter');
const subscribeRouter = require('./subscribeRouter');
const newsRouter = require('./newsRouter');
const userRouter = require('./userRouter');
const eventsRouter = require('./eventsRouter');

// Mount routes
router.use('/auth', authRouter);
router.use('/subscribe', subscribeRouter);
router.use('/news', newsRouter);
router.use('/user', userRouter);
router.use('/events', eventsRouter);

module.exports = router;