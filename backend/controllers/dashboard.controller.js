const Vital = require("../models/vital.model");
const Alert = require("../models/alert.model");
const Reminder = require("../models/reminder.model");

exports.getCaregiverDashboard = async (req, res) => {
  try {
    const userId = req.params.userId;

    const latestVital = await Vital.findOne({ userId })
      .sort({ createdAt: -1 });

    const alertsCount = await Alert.countDocuments({
      userId,
      status: "active"
    });

    const reminders = await Reminder.find({
      userId,
      status: "pending"
    }).sort({ time: 1 });

    const recentVitals = await Vital.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      latestVital,
      alertsCount,
      reminders,
      recentVitals
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

