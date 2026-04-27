const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userId: String,
  medicineName: String,
  dosage: String,
  time: String,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Reminder", reminderSchema);