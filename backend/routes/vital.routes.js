const express = require("express");
const router = express.Router();

const controller = require("../controllers/vital.controller");

// Debug (temporary)
console.log("Controller:", controller);

router.post("/live", controller.saveVitals);
router.get("/latest/:userId", controller.getLatestVitals);
router.get("/history/:userId", controller.getHistory);

module.exports = router;