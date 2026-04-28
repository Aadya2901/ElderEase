const express = require("express");
const router = express.Router();

const { getCaregiverDashboard } = require("../controllers/dashboard.controller");

router.get("/:userId", getCaregiverDashboard);

module.exports = router;