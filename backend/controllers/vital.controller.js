const Vital = require("../models/vital.model");
const Alert = require("../models/alert.model");

// POST /api/vitals/live
const saveVitals = async (req, res) => {
  try {
    const vital = await Vital.create(req.body);

    const { userId, heartRate, spo2, temperature } = req.body;

    let alerts = [];

    if (heartRate > 120) alerts.push("High Heart Rate");
    if (heartRate < 50) alerts.push("Low Heart Rate");
    if (spo2 < 92) alerts.push("Low Oxygen Level");
    if (temperature > 38.5) alerts.push("High Temperature");

    for (let item of alerts) {
      await Alert.create({
        userId,
        type: "Health Alert",
        message: item
      });
    }

    res.status(201).json({
      success: true,
      data: vital,
      alertsGenerated: alerts
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