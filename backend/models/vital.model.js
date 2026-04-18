const mongoose = require("mongoose");

const vitalSchema = new mongoose.Schema({
  heartRate: Number,
  temperature: Number,
  spo2: Number,
  bp: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vital", vitalSchema);