export const getAIResponse = async (vitals) => {
  const { heartRate, spo2, temperature } = vitals;

  // simulate API delay (feels real)
  await new Promise((res) => setTimeout(res, 800));

  let riskLevel = "LOW";
  let explanation = "";
  let medical = "";
  let actions = [];

  // 🔴 HIGH RISK
  if (spo2 < 90 || temperature > 38.5) {
    riskLevel = "HIGH";

    explanation =
      "Patient shows signs of low oxygen levels and possible fever.";

    medical =
      "SpO₂ below 90% indicates hypoxemia. Elevated temperature may suggest infection.";

    actions = [
      "Provide oxygen support immediately",
      "Contact caregiver or medical professional",
      "Monitor vitals continuously"
    ];
  }

  // 🟡 MEDIUM RISK
  else if (heartRate > 100) {
    riskLevel = "MEDIUM";

    explanation =
      "Elevated heart rate detected, which may indicate stress or early illness.";

    medical =
      "Tachycardia (HR > 100 bpm) may be caused by dehydration, anxiety, or infection.";

    actions = [
      "Ensure patient is resting",
      "Monitor vitals regularly",
      "Check hydration levels"
    ];
  }

  // 🟢 LOW RISK
  else {
    riskLevel = "LOW";

    explanation = "All vital signs are within normal range.";

    medical = "No abnormalities detected.";

    actions = ["No immediate action required"];
  }

  return {
    riskLevel,
    explanation,
    medical,
    actions
  };
};