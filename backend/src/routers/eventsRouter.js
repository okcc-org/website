const express = require('express');
const router = express.Router();

const { getEvents } = require('../controllers/eventsController');

router.get('/', getEvents);

module.exports = router;


