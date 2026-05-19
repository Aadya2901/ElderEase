const Vital = require("../models/vital.model");
const Alert = require("../models/alert.model");
const Patient = require("../models/patient.model");
const { hasStatusChanged } = require("../services/statusTracker");
const { notify } = require("../services/notifier");

// POST /api/vitals/live
const saveVitals = async (req, res) => {
  try {
    const vital = await Vital.create(req.body);

    const { userId, heartRate, spo2, temperature } = req.body;

    let alerts = [];
    let status = "NORMAL";

    // WARNING level checks
    if (heartRate > 100) alerts.push("High Heart Rate");
    if (heartRate < 55) alerts.push("Low Heart Rate");
    if (spo2 < 94) alerts.push("Low Oxygen Level");
    if (temperature > 38.0) alerts.push("High Temperature");

    // Determine status
    if (heartRate > 130 || heartRate < 40 || spo2 < 88 || temperature > 39.5) {
      status = "EMERGENCY";
    } else if (alerts.length > 0) {
      status = "WARNING";
    }
 

    // Save alerts to DB
    for (let item of alerts) {
      await Alert.create({
        userId,
        type: "Health Alert",
        message: item
      });
    }

    // Notify caregiver if status changed
    if (status !== "NORMAL" && hasStatusChanged(userId, status)) {
      const patient = await Patient.findOne({ userId });

      if (patient && patient.caregiverPhone && patient.caregiverEmail) {
        await notify(
          patient.name,
          status,
          patient.caregiverPhone,
          patient.caregiverEmail
        );
      } else {
        console.log(`No caregiver contact found for patient ${userId}`);
      }
    } else {
      hasStatusChanged(userId, status);
    }

    res.status(201).json({
      success: true,
      data: vital,
      alertsGenerated: alerts,
      status
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET latest vitals
const getLatestVitals = async (req, res) => {
  try {
    const vital = await Vital.findOne({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(vital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET history
const getHistory = async (req, res) => {
  try {
    const vitals = await Vital.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(vitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveVitals,
  getLatestVitals,
  getHistory
};