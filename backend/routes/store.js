const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { auth } = require('../middleware/auth');

// List stores for Admin and Normal Users
router.get('/', auth, storeController.getAllStores);

// Dashboard for Store Owners
router.get('/owner-dashboard', auth, storeController.getOwnerDashboard);

module.exports = router;