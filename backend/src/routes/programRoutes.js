const express = require('express');
const router = express.Router();
const { redirectToCheckout } = require('../controllers/programController');


// program checkout url
router.post('/checkout', redirectToCheckout)

module.exports = router;
