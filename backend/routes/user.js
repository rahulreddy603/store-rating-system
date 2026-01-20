const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, isAdmin } = require('../middleware/auth');

// Protected Admin routes
router.get('/stats', auth, isAdmin, userController.getAdminStats);
router.get('/list', auth, isAdmin, userController.getUsers);

module.exports = router;