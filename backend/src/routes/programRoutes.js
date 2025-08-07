const express = require('express');
const router = express.Router();
const { register, redirectToCheckout } = require('../controllers/programController');


// program checkout url
router.post('/checkout', redirectToCheckout)


// Post program registration to google sheet
router.post('/register', register);

module.exports = router;
