
const FoodDonation = require("./FoodDonation");

// Controller function to get pickups assigned to a volunteer
const getVolunteerPickups = async (req, res) => {
  try {
    const volunteerId = req.user._id; // or from token/session
    const pickups = await FoodDonation.find({
      assignedVolunteer: volunteerId,
      status: "pending",
    }).populate("donor", "name email"); // optional: get donor info
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pickups" });
  }
};

module.exports = { getVolunteerPickups };
