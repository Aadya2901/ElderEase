require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const vitalRoutes = require("./routes/vital.routes");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/vitals", vitalRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

module.exports = app;