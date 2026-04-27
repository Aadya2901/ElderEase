const express = require("express");
const router = express.Router();

const {
 getSummary,
 getTrends,
 getAlertReport
} = require(
 "../controllers/report.controller"
);

router.get(
 "/:id/summary",
 getSummary
);

router.get(
 "/:id/trends",
 getTrends
);

router.get(
 "/:id/alerts",
 getAlertReport
);

module.exports = router;