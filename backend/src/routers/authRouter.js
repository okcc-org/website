const express = require('express');
const { register, login, logout, googleAuth, googleCallback, googleSignup, googleSignupCallback } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/google/signup', googleSignup);
router.get('/google/signup/callback', googleSignupCallback);

module.exports = router; 