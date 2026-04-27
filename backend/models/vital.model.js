const mongoose = require("mongoose");

const vitalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  heartRate: Number,
  spo2: Number,
  temperature: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Vital", vitalSchema);