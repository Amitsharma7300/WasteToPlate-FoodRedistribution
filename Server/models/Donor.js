const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
  donationType: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donor", donorSchema);
