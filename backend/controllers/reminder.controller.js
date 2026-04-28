const Reminder = require("../models/reminder.model");

// Create
exports.createReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create(req.body);
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get by user
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({
      userId: req.params.userId
    }).sort({ time: 1 });

    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update status
exports.updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
exports.deleteReminder = async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);

    res.json({ message: "Reminder deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};