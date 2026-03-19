export default function VitalCard({ title, value, unit }) {
  return (
    <div style={{
      padding: "20px",
      borderRadius: "12px",
      background: "#f3f4f6",
      width: "180px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <h3>{title}</h3>
      <h1>{value} {unit}</h1>
    </div>
  );
}