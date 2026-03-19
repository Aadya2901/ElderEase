import VitalCard from "../components/VitalCard";
import StatusBadge from "../components/StatusBadge";
import RiskScore from "../components/RiskScore";

export default function PatientDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Patient Dashboard</h1>

      <StatusBadge status="WARNING" />

      <RiskScore score={6} />

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <VitalCard title="Heart Rate" value={82} unit="bpm" />
        <VitalCard title="SpO2" value={95} unit="%" />
        <VitalCard title="Temperature" value={36.8} unit="°C" />
      </div>
    </div>
  );
}