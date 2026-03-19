import VitalCard from "../components/VitalCard";
import StatusBadge from "../components/StatusBadge";
import RiskScore from "../components/RiskScore";
import InsightsPanel from "../components/InsightsPanel";
import HealthSummary from "../components/HealthSummary";
import AlertBanner from "../components/AlertBanner";

export default function PatientDashboard() {

  const generateInsights = () => {
    if (82 > 110) return "⚠ High heart rate detected. Ask patient to rest.";
    if (95 < 90) return "⚠ Low oxygen level. Check breathing immediately.";
    if (36.8 > 38) return "⚠ Fever detected. Monitor temperature.";
    return "✅ Patient is stable.";
  };

  return (
    <div style={{ padding: "20px" }}>
      
      <AlertBanner status="EMERGENCY" />

      <h1>Patient Dashboard</h1>

      {/* Summary Section */}
      <HealthSummary score={67} warnings={2} emergencies={0} />

      {/* Top Section */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <StatusBadge status="WARNING" />
        <RiskScore score={6} />
      </div>

      {/* Cards Section */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <VitalCard title="Heart Rate" value={82} unit="bpm" />
        <VitalCard title="SpO2" value={95} unit="%" />
        <VitalCard title="Temperature" value={36.8} unit="°C" />
      </div>

      {/* Insights Section */}
      <InsightsPanel insights={generateInsights()} />
    </div>
  );
}