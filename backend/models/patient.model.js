const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  name: String,
  age: Number,
  gender: String,
  relation: String,
  caregiverPhone: String,
  caregiverEmail: String
}, { timestamps: true });

module.exports =
 mongoose.model("Patient", patientSchema);