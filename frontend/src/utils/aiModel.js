export function predictRisk(hr, spo2, temp, thresholds) {
  let score = 0;

  // 📊 BASE CONTINUOUS MODEL (your original logic)
  score += (hr - 70) * 0.05;
  score += (95 - spo2) * 0.8;
  score += (temp - 36.5) * 1.5;

  // 🚨 THRESHOLD OVERRIDE (NEW)
  if (hr > thresholds.heartRate) score += 2;
  if (spo2 < thresholds.spo2) score += 3;
  if (temp > thresholds.temperature) score += 2;

  return Math.max(0, Math.min(10, Math.round(score)));
}

export function generateInsights(hr, spo2, temp, history, thresholds) {
  const insights = [];

  // 🚨 Priority conditions (top importance)
  if (spo2 < thresholds?.spo2) {
    insights.push("⚠ Low oxygen → Ask patient to sit upright and monitor breathing.");
  }

  if (hr > thresholds?.heartRate) {
    insights.push("🚨 High heart rate → Ensure patient rests and stays hydrated.");
  }

  if (temp > thresholds?.temperature) {
    insights.push("🚨 High temperature → Give paracetamol and monitor closely.");
  }

  // ⚠ Secondary conditions
  if (spo2 < 94 && spo2 >= thresholds.spo2) {
    insights.push("⚠ Oxygen slightly low.");
  }

  if (hr < 60) {
    insights.push("⚠ Low heart rate.");
  }

  if (
    history.length >= 3 &&
    history.slice(-3).every(d => d.spo2 < thresholds?.spo2)
  ) {
    insights.push("🚨 Persistent low oxygen → contact caregiver immediately");
  }
  
  // 📈 Trends (only if no emergency)
  if (insights.length === 0 && history.length >= 3) {
    const last = history[history.length - 1];
    const prev = history[history.length - 2];

    if (last.spo2 < prev.spo2) {
      insights.push("📉 Oxygen trending down.");
    }

    if (last.heartRate > prev.heartRate) {
      insights.push("📈 Heart rate increasing.");
    }
  }

  // ✅ fallback
  if (insights.length === 0) {
    insights.push("✅ All vitals stable.");
  }

  return insights;
}

export function getRiskLevel(score) {
  if (score > 7) return "HIGH";
  if (score > 4) return "MEDIUM";
  return "LOW";
}