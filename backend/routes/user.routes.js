const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Patient = require("../models/patient.model");

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      age,
      gender,
      caregiverPhone,
      caregiverEmail
    } = req.body;

    // Save to User collection
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role
    });

    // If patient, also save to Patient collection
if (role === "patient") {
      const formattedPhone = caregiverPhone.startsWith("+")
        ? caregiverPhone
        : `+91${caregiverPhone}`;

      await Patient.create({
        userId: user._id.toString(),
        name,
        age,
        gender,
        caregiverPhone: formattedPhone,
        caregiverEmail
      });
    }

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, password, role });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;