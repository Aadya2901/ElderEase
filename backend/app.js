const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

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

app.post("/api/ai-insight", async (req, res) => {
  try {
    const { heartRate, spo2, temperature, fallDetected } = req.body;

    const prompt = `
You are a medical assistant AI.

Patient vitals:
Heart Rate: ${heartRate} bpm
SpO2: ${spo2}%
Temperature: ${temperature}°C
Fall Detected: ${fallDetected}

Analyze and return ONLY JSON:

{
  "riskLevel": "LOW | MEDIUM | HIGH",
  "explanation": "short reason",
  "medical": "possible condition",
  "actions": ["action1", "action2"]
}

Rules:
- Keep explanation under 15 words
- Be practical
- Be medically safe

Return ONLY valid JSON.
Do NOT add explanation.
Do NOT add markdown.
Do NOT wrap in ```.

Strict JSON only.

`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash-latest"
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    const text = result.response.text();

    let parsed;

try {
  let cleanText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const match = cleanText.match(/\{[\s\S]*\}/);

  if (!match) throw new Error("No JSON found");

  parsed = JSON.parse(match[0]);

  if (!parsed.riskLevel || !parsed.actions) {
    throw new Error("Invalid AI structure");
  }
  
  parsed.source = "ai";

} catch (e) {
  console.log("Parsing failed, raw:", text);

  parsed = {
    riskLevel: "MEDIUM",
    explanation: "AI response unclear, fallback used.",
    medical: "Parsing failed.",
    actions: ["Recheck vitals"],
    source: "fallback"
  };
}

    res.json(parsed);

  } catch (err) {
    console.error("AI ERROR:", err.message);

    res.json({
      riskLevel: "MEDIUM",
      explanation: "Vitals slightly abnormal.",
      medical: "Possible mild stress.",
      actions: ["Recheck vitals"],
      source: "fallback"
    });
  }
});

module.exports = app;