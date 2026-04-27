const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "ElderEase Backend Running" });
});

app.use("/api/vitals", require("./routes/vital.routes"));
app.use("/api/alerts", require("./routes/alert.routes"));
app.use("/api/reminders", require("./routes/reminder.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/summary", require("./routes/summary.routes"));

app.use(
 "/api/caregiver",
 require("./routes/caregiver.routes")
);

app.use(
 "/api/reports",
 require("./routes/report.routes")
);
module.exports = app;