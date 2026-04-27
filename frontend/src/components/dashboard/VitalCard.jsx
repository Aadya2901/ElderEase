export default function VitalCard({ title, value, unit, icon }) {
  return (
    <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

      <div>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "4px" }}>
          {title}
        </p>

        <h2 style={{ fontSize: "26px", fontWeight: "700", margin: 0 }}>
          {value} <span style={{ fontSize: "14px" }}>{unit}</span>
        </h2>
      </div>

      <div
        style={{
          background: "#EAF4EA",
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