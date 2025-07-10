const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");


// ✅ Assign a pickup to a volunteer
router.put("/assign/:id", authMiddleware, async (req, res) => {
  const pickupId = req.params.id;
  const { volunteerId } = req.body;

  try {
    const pickup = await PickupRequest.findById(pickupId);
    if (!pickup) return res.status(404).json({ message: "Pickup not found" });

    pickup.assignedVolunteer = volunteerId;
    pickup.status = "assigned";
    await pickup.save();

    res.status(200).json({ message: "Pickup assigned successfully", pickup });
  } catch (err) {
    console.error("Assign Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
