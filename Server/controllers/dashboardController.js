
const FoodDonation = require('../models/FoodDonation');
const Pickup = require('../models/Pickup');

const getDashboardData = async (req, res) => {
  const totalDonations = await FoodDonationDonation.countDocuments({ user: req.user._id });
  const totalPickups = await Pickup.countDocuments({ donor: req.user._id });
  res.json({ totalDonations, totalPickups });
};

const getUserDonations = async (req, res) => {
  const donations = await FoodDonation.find({ user: req.user._id });
  res.json(donations);
};

const getUserPickups = async (req, res) => {
  const pickups = await Pickup.find({ donor: req.user._id }).populate('ngo', 'email');
  res.json(pickups);
};

module.exports = { getDashboardData, getUserDonations, getUserPickups };
