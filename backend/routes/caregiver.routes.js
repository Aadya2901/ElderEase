const express = require("express");
const router = express.Router();

const {
 getCaregiverDashboard,
 getPatientDetail,
 getPatientHistory
} = require(
 "../controllers/caregiver.controller"
);

router.get(
 "/dashboard",
 getCaregiverDashboard
);

router.get(
 "/patient/:id/detail",
 getPatientDetail
);

router.get(
 "/patient/:id/history",
 getPatientHistory
);

module.exports = router;