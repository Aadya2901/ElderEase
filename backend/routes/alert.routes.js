const express = require("express");
const router = express.Router();

const { getAlerts } = require("../controllers/alert.controller");

router.get("/:userId", getAlerts);

module.exports = router;