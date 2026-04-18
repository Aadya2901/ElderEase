export const getAIResponse = async (vitals) => {
  try {
    const res = await fetch("http://localhost:5000/api/ai-insight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vitals),
    });

    console.log("STATUS:", res.status);

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    const data = JSON.parse(text);
    return data;

  } catch (err) {
    console.error("AI API failed:", err);

    const { heartRate, spo2, temperature, fallDetected, prevVitals } = vitals;

    let riskLevel = "LOW";
    let explanation = "";
    let medical = "";
    let actions = [];

    // 🔴 HIGH RISK
    if (spo2 < 90 || temperature > 38.5 || heartRate > 120 || fallDetected) {
      riskLevel = "HIGH";
      explanation = "Critical vitals detected. Immediate attention required.";
      medical = "Possible hypoxemia, infection, or cardiovascular stress.";
      actions = [
        "Call caregiver immediately",
        "Check oxygen support",
        "Seek emergency medical help"
      ];
    }

    // 🟡 MEDIUM RISK
    else if (spo2 < 94 || temperature > 37.5 || heartRate > 100) {
      riskLevel = "MEDIUM";
      explanation = "Vitals slightly abnormal. Monitoring required.";
      medical = "Early signs of respiratory or physiological stress.";
      actions = [
        "Recheck vitals in 10 minutes",
        "Ensure hydration",
        "Limit physical activity"
      ];
    }

    // 🟢 LOW RISK
    else {
      riskLevel = "LOW";
      explanation = "Vitals within normal range.";
      medical = "No immediate concern.";
      actions = [
        "Continue routine monitoring",
        "Maintain healthy habits"
      ];
    }

    // 🧠 TREND AWARENESS
    if (prevVitals) {

      if (prevVitals?.spo2 !== null && prevVitals.spo2 > spo2) {
        explanation += " Oxygen level is decreasing.";
      }

      if (prevVitals?.heartRate !== null && prevVitals.heartRate < heartRate) {
        explanation += " Heart rate is rising.";
      }

      if (prevVitals?.temperature !== null && prevVitals.temperature < temperature) {
        explanation += " Temperature is increasing.";
      }

      // 🚨 STRONG WORSENING
      if (
        prevVitals?.spo2 !== null &&
        prevVitals.spo2 - spo2 >= 2 &&
        prevVitals?.heartRate !== null &&
        heartRate - prevVitals.heartRate >= 5
      ) {
        explanation += " Condition is rapidly worsening.";
      }

      // 🟢 STABLE
      else if (
        Math.abs(prevVitals.spo2 - spo2) < 1 &&
        Math.abs(prevVitals.heartRate - heartRate) < 3 &&
        Math.abs(prevVitals.temperature - temperature) < 0.2
      ) {
        explanation += " Vitals are stable.";
      }
    }

    if (spo2 < 85) {
      actions.push("Immediate hospitalization required");
    }

    return {
      riskLevel,
      explanation,
      medical,
      actions,
      source: "fallback"
    };
  }
};