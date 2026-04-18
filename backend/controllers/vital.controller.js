const service = require("../services/vital.service");

const addVitals = async (req, res) => {
  try {
    const data = await service.saveVital(req.body);
    res.status(201).json(data);
  } catch {
    res.status(500).json({ message: "Error saving data" });
  }
};

const getVitals = async (req, res) => {
  try {
    const data = await service.getVitals();
    res.json(data);
  } catch {
    res.status(500).json({ message: "Error fetching data" });
  }
};

module.exports = { addVitals, getVitals };