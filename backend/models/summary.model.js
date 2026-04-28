const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema({
  userId: String,
  date: String,
  avgHeartRate: Number,
  avgSpo2: Number,
  avgTemperature: Number,
  alertsCount: Number
});

module.exports = mongoose.model("Summary", summarySchema);