const express = require("express");
const router = express.Router();

const {
  saveVitals,
  getLatestVitals,
  getHistory
} = require("../controllers/vital.controller");

router.post("/live", saveVitals);
router.get("/latest/:userId", getLatestVitals);
router.get("/history/:userId", getHistory);
const { addVitals, getVitals } = require("../controllers/vital.controller");

router.post("/", addVitals);
router.get("/", getVitals);

module.exports = router;