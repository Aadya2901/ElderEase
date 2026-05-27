export default function InsightsPanel({ insights }) {
  return (
    <div style={{
      marginTop: "20px",
      padding: "15px",
      background: "#fef3c7",
      borderRadius: "10px"
    }}>
      <h3>Health Insights</h3>
      <p>{insights}</p>
    </div>
  );
}