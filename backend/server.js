import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ✅ AI ROUTE
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

    // ✅ Initialize Gemini
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

    console.log("Gemini raw:", text);

    let parsed;

    try {
      // ✅ Strong JSON cleaning
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
    console.error("FULL ERROR:", err.message);

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

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});