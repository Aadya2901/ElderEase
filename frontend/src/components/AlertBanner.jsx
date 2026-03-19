export default function AlertBanner({ status }) {
  if (status !== "EMERGENCY") return null;

  return (
    <div style={{
      background: "red",
      color: "white",
      padding: "15px",
      borderRadius: "10px",
      marginTop: "20px",
      textAlign: "center",
      fontWeight: "bold"
    }}>
      🚨 EMERGENCY DETECTED! Immediate attention required.
    </div>
  );
}