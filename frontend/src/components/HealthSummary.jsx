export default function HealthSummary({ score, warnings, emergencies }) {
  return (
    <div style={{
      marginTop: "20px",
      padding: "20px",
      background: "#f9fafb",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      gap: "30px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
    }}>
      
      {/* Score Circle */}
      <div style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        border: "6px solid orange",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "20px",
        color: "orange"
      }}>
        {score}
      </div>

      {/* Stats */}
      <div>
        <p><b>Health Score:</b> {score}/100</p>
        <p>⚠ Warnings: {warnings}</p>
        <p>🚨 Emergencies: {emergencies}</p>
      </div>

    </div>
  );
}