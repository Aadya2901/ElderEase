export default function PatientCard({ patient }) {

  const risk =
    patient.heartRate > 110 || patient.spo2 < 92 || patient.temperature > 38
      ? "high"
      : "normal";

  return (
    <div className={`patient-card ${risk}`}>

      <h3>{patient.name}</h3>

      <div className={`status ${risk}`}>
        {risk === "high" ? "EMERGENCY" : "NORMAL"}
      </div>

      {risk === "high" && (
        <div className="alert">
          🚨 Immediate attention required
        </div>
      )}

      <div className="vitals">
        ❤️ HR: {patient.heartRate} bpm <br />
        🔵 SpO2: {patient.spo2}% <br />
        🌡 Temp: {patient.temperature}°C
      </div>

      <button
        className="view-btn"
        onClick={() => {
          localStorage.setItem("selectedPatient", JSON.stringify(patient));
          window.location.href = "/dashboard";
        }}
      >
        View Details
      </button>

    </div>
  );
}