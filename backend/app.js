const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://elder-ease-care-hub.web.app"
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Origin:", origin); // debug

    // allow requests like Postman (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// app.options("/*", cors());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ElderEase backend running"
  });
});

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
