const express = require('express');
const router = express.Router();
const { registerClass, handleStripeWebhook } = require('../controllers/classesController');

router.post('/:programType/register', registerClass);
router.post('/webhook', express.raw({type: 'application/json'}), handleStripeWebhook);

module.exports = router;
