export function predictRisk(hr, spo2, temp) {
  let score = 0;

  score += (hr - 70) * 0.05;
  score += (95 - spo2) * 0.8;
  score += (temp - 36.5) * 1.5;

  return Math.max(0, Math.min(10, Math.round(score)));
}

export function generateInsights(hr, spo2, temp) {
  const insights = [];

  if (spo2 < 94) {
    insights.push("⚠ Oxygen levels dropping. Risk of hypoxia if trend continues.");
  }

  if (hr > 100 && temp > 37.5) {
    insights.push("🚨 Elevated heart rate + temperature suggests possible infection.");
  }

  if (hr < 60) {
    insights.push("⚠ Low heart rate detected. Monitor for dizziness or fatigue.");
  }

  if (temp > 38) {
    insights.push("🚨 High fever detected. Immediate attention recommended.");
  }

  if (spo2 >= 95 && hr >= 60 && hr <= 100 && temp < 37.5) {
    insights.push("✅ All vitals are within normal range. Patient stable.");
  }

  // 🧠 TREND ANALYSIS 
  if (history.length >= 3) {
    const last = history[history.length - 1];
    const prev = history[history.length - 2];

    if (last.spo2 < prev.spo2) {
      insights.push("📉 Oxygen levels showing downward trend over time.");
    }

    if (last.heartRate > prev.heartRate) {
      insights.push("📈 Heart rate increasing steadily.");
    }
  }

  return insights;
}

export function getRiskLevel(score) {
  if (score > 7) return "HIGH";
  if (score > 4) return "MEDIUM";
  return "LOW";
}