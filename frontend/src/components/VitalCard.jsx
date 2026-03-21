export default function VitalCard({ title, value, unit, icon, style }) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "14px",
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...style
      }}
    >
      {/* LEFT SIDE */}
      <div>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>{title}</p>
        <h2 style={{ fontSize: "28px", fontWeight: "700" }}>
          {value} <span style={{ fontSize: "16px" }}>{unit}</span>
        </h2>
      </div>

      {/* RIGHT ICON */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {icon}
      </div>
    </div>
  );
}