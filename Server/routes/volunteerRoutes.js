const express = require("express");
const router = express.Router();
const FoodDonation = require("../models/FoodDonation");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get('/assigned-pickups', authMiddleware, async (req, res) => {
  try {
    const pickups = await FoodDonation.find({ assignedVolunteer: req.user._id })
      .populate('donor', 'name'); // populate donor name
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching assigned pickups' });
  }
});

// Accept pickup
router.post('/pickup/:id/accept', authMiddleware, async (req, res) => {
  try {
    const updated = await FoodDonation.findOneAndUpdate(
      { _id: req.params.id, assignedVolunteer: req.user._id },
      { status: 'accepted' },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Pickup not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error accepting pickup' });
  }
});

// Reject pickup
router.post('/pickup/:id/reject', authMiddleware, async (req, res) => {
  try {
    const updated = await FoodDonation.findOneAndUpdate(
      { _id: req.params.id, assignedVolunteer: req.user._id },
      { status: 'pending', assignedVolunteer: null },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Pickup not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting pickup' });
  }
});

module.exports = router;
