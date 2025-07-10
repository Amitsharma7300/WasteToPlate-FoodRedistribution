const Donor = require("../models/Donor");

const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.status(200).json(donors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donors", error: err });
  }
};

module.exports = { getAllDonors };
