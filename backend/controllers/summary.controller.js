const Vital = require("../models/vital.model");

exports.getSummary = async (req, res) => {
  try {
    const userId = req.params.userId;

    const vitals = await Vital.find({ userId });

    if (!vitals.length) {
      return res.json({ message: "No vitals found" });
    }

    let totalHR = 0;
    let totalSpO2 = 0;
    let totalTemp = 0;

    vitals.forEach(v => {
      totalHR += v.heartRate;
      totalSpO2 += v.spo2;
      totalTemp += v.temperature;
    });

    const count = vitals.length;

    res.json({
      totalReadings: count,
      avgHeartRate: (totalHR / count).toFixed(1),
      avgSpO2: (totalSpO2 / count).toFixed(1),
      avgTemperature: (totalTemp / count).toFixed(1)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};