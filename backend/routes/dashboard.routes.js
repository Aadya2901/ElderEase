const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboard.controller");

router.get("/:userId", getDashboard);

module.exports = router;