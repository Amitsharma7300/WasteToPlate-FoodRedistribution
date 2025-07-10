const express = require("express");
const Pickup = require("../models/Pickup");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all assigned pickups
router.get("/assigned", authMiddleware, async (req, res) => {
  try {
    const pickups = await Pickup.find({
      assignedTo: req.user._id,
      status: "assigned",
    }).populate("donationId");
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: "Error fetching assigned pickups" });
  }
});

// Mark pickup as completed
router.post("/complete/:id", authMiddleware, async (req, res) => {
  try {
    const pickup = await Pickup.findById(req.params.id);

    if (!pickup || pickup.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    pickup.status = "completed";
    await pickup.save();

    res.json({ message: "Pickup marked as completed" });
  } catch (err) {
    res.status(500).json({ message: "Error updating pickup" });
  }
});

module.exports = router;
