const Alert = require("../models/alert.model");

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};