const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  quantity: Number,
  foodType: String,
  status: {
    type: String,
    enum: ["pending", "picked", "delivered"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Food", foodSchema);
