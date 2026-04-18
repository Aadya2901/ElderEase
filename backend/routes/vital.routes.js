const express = require("express");
const router = express.Router();

const { addVitals, getVitals } = require("../controllers/vital.controller");

router.post("/", addVitals);
router.get("/", getVitals);

module.exports = router;