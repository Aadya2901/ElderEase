export function predictRisk(hr, spo2, temp) {
  let score = 0;

  score += (hr - 70) * 0.05;
  score += (95 - spo2) * 0.8;
  score += (temp - 36.5) * 1.5;

  return Math.max(0, Math.min(10, Math.round(score)));
}

export function generateInsights(hr, spo2, temp) {
  let messages = [];

  if (hr > 110) messages.push("⚠ High heart rate detected");
  if (spo2 < 94) messages.push("⚠ Low oxygen level");
  if (temp > 38) messages.push("⚠ Fever detected");

  if (messages.length === 0)
    return ["✅ Patient is stable"];

  return messages;
}

export function getRiskLevel(score) {
  if (score > 7) return "HIGH";
  if (score > 4) return "MEDIUM";
  return "LOW";
}