export default function ThresholdCard({ thresholds, setThresholds }) {
  return (
    <div style={card}>
      <h3>⚙ Custom Thresholds</h3>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={thresholds.heartRate}
          onChange={(e) =>
            setThresholds({
              ...thresholds,
              heartRate: Number(e.target.value)
            })
          }
          placeholder="HR Max"
          style={inputSmall}
        />

        <input
          value={thresholds.spo2}
          onChange={(e) =>
            setThresholds({
              ...thresholds,
              spo2: Number(e.target.value)
            })
          }
          placeholder="SpO₂ Min"
          style={inputSmall}
        />

        <input
          value={thresholds.temperature}
          onChange={(e) =>
            setThresholds({
              ...thresholds,
              temperature: Number(e.target.value)
            })
          }
          placeholder="Temp Max"
          style={inputSmall}
        />
      </div>
    </div>
  );
}

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  marginTop: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

const inputSmall = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  width: "100px"
};