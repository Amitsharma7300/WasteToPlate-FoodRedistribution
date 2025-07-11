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

  // Check authentication
  if (!req.user || !req.user._id) {
    return res.status(401).json({ success: false, message: "Unauthorized: User not authenticated" });
  }

  try {
    let parsedQuantity = quantity;
    if (typeof quantity === "string") {
      // Extract number from string like "5 kg"
      const match = quantity.match(/\d+/);
      parsedQuantity = match ? Number(match[0]) : undefined;
    }
    if (!parsedQuantity) {
      return res.status(400).json({ success: false, message: "Quantity must be a number" });
    }

    const donation = new FoodDonation({
      foodType,
      quantity: parsedQuantity,
      pickupAddress,
      contactNumber,
      description,
      donor: req.user._id,
    });

    await donation.save();

    res.status(201).json({ success: true, donation });
  } catch (error) {
    console.error("Donation error:", error);
    res.status(500).json({ success: false, message: "Donation failed", error: error.message });
  }
});

module.exports = router;

