export default function StatusBadge({ status }) {
  let color = "green";

  if (status === "WARNING") color = "orange";
  if (status === "EMERGENCY") color = "red";

  return (
    <div style={{
      background: color,
      color: "white",
      padding: "10px",
      borderRadius: "8px",
      display: "inline-block",
      marginTop: "10px"
    }}>
      {status}
    </div>
  );
}