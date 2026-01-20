const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { auth } = require('../middleware/auth');

// Submit or Update a rating
router.post('/submit', auth, ratingController.submitRating);

module.exports = router;