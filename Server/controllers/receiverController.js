const FoodDonation = require("../models/FoodDonation");

// Get all available (pending & unassigned) donations
exports.getAvailableDonations = async (req, res) => {
  try {
    const donations = await FoodDonation.find({
      status: "pending",
      $or: [
        { assignedReceiver: null },
        { assignedReceiver: { $exists: false } }
      ]
    });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations" });
  }
};

// Accept a donation
exports.acceptDonation = async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id);
    if (!donation || donation.status !== "pending" || donation.assignedReceiver) {
      return res.status(400).json({ message: "Donation not available" });
    }

    donation.assignedReceiver = req.user._id;
    donation.status = "accepted";
    await donation.save();

    res.json({ message: "Donation accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error accepting donation" });
  }
};

// Get accepted or completed donations for this receiver
exports.getAcceptedDonations = async (req, res) => {
  try {
    const donations = await FoodDonation.find({
      assignedReceiver: req.user._id,
      status: { $in: ["accepted", "completed"] },
    });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching accepted donations" });
  }
};

// Mark a donation as completed
exports.markDonationComplete = async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id);
    if (!donation || !donation.assignedReceiver || donation.assignedReceiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    donation.status = "completed";
    await donation.save();

    res.json({ message: "Donation marked as completed" });
  } catch (error) {
    res.status(500).json({ message: "Error completing donation" });
  }
};

// Get pending pickups for this receiver
exports.getPendingPickups = async (req, res) => {
  try {
    const pickups = await FoodDonation.find({
      assignedReceiver: req.user._id,
      status: "accepted",
    });
    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending pickups" });
  }
};