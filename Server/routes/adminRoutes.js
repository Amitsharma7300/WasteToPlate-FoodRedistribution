const express = require('express');
const router = express.Router();
const User = require('../models/User');
const FoodDonation = require('../models/FoodDonation');
// Make sure this model exists
const Pickup = require('../models/assignedPickup'); // Make sure this model exists

const { authMiddleware, verifyAdmin } = require('../middleware/authMiddleware');
const { protect, isAdmin } = require("../middleware/authMiddleware");
// Import controller functions using CommonJS
const {
  getVolunteers,
  getPendingDonations,
  assignPickup,
  getAssignedPickups,
} = require("../controllers/adminController");


// Controller-based routes (add auth if needed)
router.get("/volunteers", authMiddleware, verifyAdmin, getVolunteers);
router.get("/pending-donations", authMiddleware, verifyAdmin, getPendingDonations);
router.post("/assign-pickup", authMiddleware, verifyAdmin, assignPickup);
router.get("/assigned-pickups", authMiddleware, verifyAdmin, getAssignedPickups);

// 🧑‍💼 Get all donors and their donation data
router.get('/donors', authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const donors = await User.find({ role: 'donor' }).select('-password');

    const enrichedDonors = await Promise.all(
      donors.map(async donor => {
        const donations = await FoodDonation.find({ userId: donor._id }).select('foodType quantity createdAt phoneNumber');
        return {
          id: donor._id,
          name: donor.name,
          email: donor.email,
          image: donor.image || null,
          donations
        };
      })
    );

    res.status(200).json(enrichedDonors);
  } catch (err) {
    console.error("Admin donor fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch donors" });
  }
});


router.get('/ngos', authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const ngos = await User.find({ role: 'receiver' }).select('-password');
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch NGOs' });
  }
});


// GET all volunteers (for admin)
router.get('/volunteers-list', authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const volunteers = await User.find({ role: "volunteer" }).select("-password");
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching volunteers" });
  }
});


// backend/routes/adminRoutes.js
router.get('/stats', authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const donors = await User.countDocuments({ role: 'donor' });
    const ngos = await User.countDocuments({ role: 'receiver' });
    const volunteers = await User.countDocuments({ role: 'volunteer' });

    const donations = await FoodDonation.countDocuments();
    const pickups = await Pickup.countDocuments();

    res.json({ donors, ngos, volunteers, donations, pickups });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// 👇 GET assigned pickups
router.get('/assigned-pickups-list', authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const pickups = await Donation.find({ assignedTo: { $ne: null } })
      .populate('assignedTo', 'name email')
      .populate('donor', 'name email')
      .sort({ createdAt: -1 });

    res.json(pickups);
  } catch (err) {
    console.error('Error fetching assigned pickups:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

