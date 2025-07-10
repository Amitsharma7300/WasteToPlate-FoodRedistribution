const FoodDonation = require("../models/FoodDonation");
const User = require("../models/User");

const AssignedPickup = require("../models/assignedPickup");

// Get all volunteers
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({ role: "volunteer" });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch volunteers" });
  }
};

// Get only pending (unassigned) donations
const getPendingDonations = async (req, res) => {
  try {
    const donations = await FoodDonation.find({ isAssigned: { $ne: true } });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

// Assign donation to volunteer
const assignPickup = async (req, res) => {
  const { volunteerId, donationId } = req.body;

  try {
    const donation = await FoodDonation.findById(donationId);
    if (!donation) return res.status(404).json({ error: "Donation not found" });

    const newAssignment = new AssignedPickup({
      volunteer: volunteerId,
      donation: donationId,
      status: "Assigned",
    });

    await newAssignment.save();

    await Donation.findByIdAndUpdate(donationId, { isAssigned: true });

    res.status(201).json({ message: "Pickup assigned successfully." });
  } catch (err) {
    res.status(500).json({ error: "Assignment failed" });
  }
};

// Get all assigned pickups with volunteer and donation details
const getAssignedPickups = async (req, res) => {
  try {
    const pickups = await AssignedPickup.find()
      .populate("volunteer", "name email")
      .populate("donation");

    // Transform data for frontend display
    const formatted = pickups.map((pickup) => ({
      _id: pickup._id,
      status: pickup.status,
      volunteer: pickup.volunteer,
      foodType: pickup.donation?.foodType || "N/A",
      pickupAddress: pickup.donation?.pickupAddress || "N/A",
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch assigned pickups" });
  }
};
exports.assignPickup = async (req, res) => {
  try {
    const { volunteerId, donationId } = req.body;

    // 1. Validation
    if (!volunteerId || !donationId) {
      return res.status(400).json({ message: "Missing volunteer or donation ID" });
    }

    // 2. Find the donation
    const donation = await FoodDonation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // 3. Assign volunteer & update status
    donation.assignedVolunteer = volunteerId;
    donation.status = "assigned";

    await donation.save();

    res.status(200).json({ message: "Pickup assigned successfully." });
  } catch (err) {
    console.error("❌ Error assigning pickup:", err);
    res.status(500).json({ message: "Server error during assignment." });
  }
};
module.exports = {
  getVolunteers,
  getPendingDonations,
  assignPickup,
  getAssignedPickups,
};
