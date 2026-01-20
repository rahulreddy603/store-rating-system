const express = require('express');
const router = express.Router();
// Check this path! It must point to your authController file
const authController = require('../controllers/authController');

// If authController.signup is undefined, this line crashes the app
router.post('/signup', authController.signup); 
router.post('/login', authController.login);

module.exports = router;