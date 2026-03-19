import VitalCard from "../components/VitalCard";
import StatusBadge from "../components/StatusBadge";
import RiskScore from "../components/RiskScore";
import InsightsPanel from "../components/InsightsPanel";
import HealthSummary from "../components/HealthSummary";
import AlertBanner from "../components/AlertBanner";
import HeartRateChart from "../components/HeartRateChart";

export default function PatientDashboard() {

  const heartRate = 82;
  const spo2 = 95;
  const temperature = 36.8;

  const generateInsights = () => {
    if (status === "EMERGENCY")
      return "🚨 Critical condition detected. Immediate medical attention required.";

    if (status === "WARNING")
      return "⚠ Patient showing abnormal signs. Monitor closely.";

    return "✅ Patient is stable.";
  };

  const status =
  heartRate > 110 || spo2 < 90 || temperature > 38
    ? "EMERGENCY"
    : heartRate > 95 || spo2 < 94 || temperature > 37.5
    ? "WARNING"
    : "NORMAL";

    const riskScore =
      (heartRate > 110 ? 3 : 0) +
      (spo2 < 92 ? 4 : 0) +
      (temperature > 38 ? 3 : 0);

    const warnings =
      (heartRate > 95 || spo2 < 94 || temperature > 37.5) ? 1 : 0;

    const emergencies =
      (heartRate > 110 || spo2 < 90 || temperature > 38) ? 1 : 0;

    const healthScore = 100 - riskScore * 10;

  return (
    <div style={{ padding: "20px" }}>
      
      <AlertBanner status={status} />

      <h1>Patient Dashboard</h1>

      {/* Summary Section */}
      <HealthSummary 
        score={healthScore} 
        warnings={warnings} 
        emergencies={emergencies} 
      />

      {/* Top Section */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <StatusBadge status={status} />
        <RiskScore score={riskScore} />
      </div>

      {/* Cards Section */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <VitalCard title="Heart Rate" value={heartRate} unit="bpm" />
        <VitalCard title="SpO2" value={spo2} unit="%" />
        <VitalCard title="Temperature" value={temperature} unit="°C" />
      </div>

      {/* Insights Section */}
      <InsightsPanel insights={generateInsights()} />
      
      {/* Charts Section */}
      {/* <HeartRateChart /> */}
    </div>
  );
}