const express = require("express");
const {
  getAvailableDonations,
  acceptDonation,
  getAcceptedDonations,
  markDonationComplete,
  getPendingPickups
} = require("../controllers/receiverController");
const { authMiddleware } = require("../middleware/authMiddleware");
const FoodDonation = require("../models/FoodDonation");

const router = express.Router();

// All routes use the FoodDonation model in the controller
router.get("/donations", authMiddleware, getAvailableDonations);        // pending & unassigned
router.post("/accept/:id", authMiddleware, acceptDonation);             // mark accepted
router.get("/accepted", authMiddleware, getAcceptedDonations);          // show accepted/completed
router.patch("/complete/:id", authMiddleware, markDonationComplete);    // mark completed
router.get("/pending-pickups", authMiddleware, getPendingPickups);      // show pending pickups for receiver

module.exports = router;
