const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({
  donation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodDonation", // <-- FIXED HERE
    required: true
  },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["Assigned", "Picked", "Delivered"],
    default: "Assigned"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Pickup", pickupSchema);
