const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  userId: String,
  type: String,
  message: String,
  status: {
    type: String,
    default: "active"
  }
}, { timestamps: true });

module.exports = mongoose.model("Alert", alertSchema);