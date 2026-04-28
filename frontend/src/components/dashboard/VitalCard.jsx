export default function VitalCard({ title, value, unit, icon, style }) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "14px",              // 🔥 you were missing this
        background: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        textAlign: "left",                // 🔥 prevents global CSS issues

        transition: "all 0.2s ease",
        ...style
      }}
    >
      {/* LEFT */}
      <div>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "4px" }}>
          {title}
        </p>

        <h2 style={{ fontSize: "28px", fontWeight: "700", margin: 0 }}>
          {value} <span style={{ fontSize: "16px" }}>{unit}</span>
        </h2>
      </div>

      {/* RIGHT ICON */}
      <div
        style={{
          background: "#f3f4f6",
          padding: "10px",
          borderRadius: "12px",
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