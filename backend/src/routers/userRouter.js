const express = require('express');
const router = express.Router();
const { getUser, updateUser, changePassword } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authenticateUser');

router.get('/profile', authenticateUser, getUser);
router.put('/profile', authenticateUser, updateUser);
router.put('/change-password', authenticateUser, changePassword);

module.exports = router;
