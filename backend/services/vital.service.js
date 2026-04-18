const Vital = require("../models/vital.model");

const saveVital = async (data) => {
  return await new Vital(data).save();
};

const getVitals = async () => {
  return await Vital.find().sort({ timestamp: -1 });
};

module.exports = { saveVital, getVitals };