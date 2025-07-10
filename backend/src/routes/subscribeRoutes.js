const express = require('express');
const router = express.Router();
const { subscribe, sendEmail } = require('../controllers/subscribeController');

router.post('/', subscribe);
router.post('/send-email', sendEmail);

module.exports = router;

