const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const subscribeRoutes = require('./subscribeRoutes');
const newsRoutes = require('./newsRoutes');
const userRoutes = require('./userRoutes');
const classesRoutes = require('./classesRoutes');
const programRoutes = require('./programRoutes');


// Mount routes
router.use('/auth', authRoutes);
router.use('/subscribe', subscribeRoutes);
router.use('/news', newsRoutes);
router.use('/user', userRoutes);
router.use('/classes', classesRoutes);
router.use('/program', programRoutes)

module.exports = router;