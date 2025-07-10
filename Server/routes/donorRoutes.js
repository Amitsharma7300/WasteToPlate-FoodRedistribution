const express = require("express");
const router = express.Router();
const FoodDonation = require("../models/FoodDonation");
const { authMiddleware } = require("../middleware/authMiddleware");

// GET donor stats
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const total = await FoodDonation.countDocuments({ userId: req.user._id });
    const pending = await FoodDonation.countDocuments({ userId: req.user._id, status: "pending" });
    res.json({ total, pending });
  } catch (err) {
    res.status(500).json({ total: 0, pending: 0 });
  }
});

module.exports = router;
