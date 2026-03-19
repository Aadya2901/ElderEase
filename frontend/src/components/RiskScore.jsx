export default function RiskScore({ score }) {
  return (
    <div style={{
      marginTop: "10px",
      padding: "10px",
      background: "#e5e7eb",
      borderRadius: "8px",
      display: "inline-block"
    }}>
      <h3>Risk Score: {score}/10</h3>
    </div>
  );
}