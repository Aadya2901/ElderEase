import ErrorIcon from "@mui/icons-material/Error";

export default function AlertBanner({ status }) {
  if (status !== "EMERGENCY") return null;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",   // ✅ vertical alignment FIX
      justifyContent: "center",
      gap: "10px",
      background: "#ef4444",
      color: "white",
      padding: "14px",
      borderRadius: "10px",
      fontWeight: "600"
    }}>
      <ErrorIcon style={{ 
        fontSize: "22px",
        marginTop: "1px"
      }} />

      <span style={{
        display: "flex",
        alignItems: "center"  // ✅ ensures text aligns with icon
      }}>
        EMERGENCY DETECTED! Immediate attention required.
      </span>
    </div>
  );
}