const express = require("express");
const FoodDonation = require("../models/FoodDonation");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/donate", authMiddleware, async (req, res) => {
  const { foodType, quantity, pickupAddress, contactNumber, description } = req.body;

  // Validate required fields
  if (!foodType || !quantity || !pickupAddress || !contactNumber) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const donation = new FoodDonation({
      foodType,
      quantity,
      pickupAddress,
      contactNumber,
      description,
      userId: req.user._id, // from auth middleware
    });

    await donation.save();

    res.status(201).json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ success: false, message: "Donation failed", error: error.message });
  }
});

module.exports = router;
