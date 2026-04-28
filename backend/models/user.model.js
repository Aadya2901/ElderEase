const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: String,
  name: String,
  email: String,
  age: Number,
  phone: String,
  role: {
    type: String,
    default: "elder"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);