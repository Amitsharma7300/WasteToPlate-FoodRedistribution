const express = require('express');
const router = express.Router();

// ✅ Import the correct middleware and controllers
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getDashboardData,
  getUserDonations,
  getUserPickups
} = require('../controllers/dashboardController');

// ✅ Use correct middleware function
router.get('/overview', authMiddleware, getDashboardData);
router.get('/donations', authMiddleware, getUserDonations);
router.get('/pickups', authMiddleware, getUserPickups);

module.exports = router;
