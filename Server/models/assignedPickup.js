const mongoose = require("mongoose");

const assignedPickupSchema = new mongoose.Schema({
  donation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodDonation", // ✅ correct
    required: true,
  },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Assigned", "PickedUp", "Completed"],
    default: "Assigned",
  },
}, { timestamps: true });

const AssignedPickup = mongoose.model("AssignedPickup", assignedPickupSchema);
module.exports = AssignedPickup;
