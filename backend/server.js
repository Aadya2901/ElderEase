require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect DB first
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
// Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// AI ROUTE
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
      const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const jsonStart = cleanText.indexOf("{");
      const jsonEnd = cleanText.lastIndexOf("}");

      const jsonString = cleanText.substring(jsonStart, jsonEnd + 1);

      parsed = JSON.parse(jsonString);
      parsed.source = "ai";

    } catch (e) {
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
    res.json({
      riskLevel: "MEDIUM",
      explanation: "Vitals slightly abnormal. Monitoring recommended.",
      medical: "Possible mild physiological stress.",
      actions: [
        "Recheck vitals in 10 minutes",
        "Ensure hydration",
        "Limit physical activity"
      ],
      source: "fallback"
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});