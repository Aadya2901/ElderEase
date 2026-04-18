import SaveIcon from "@mui/icons-material/Save";
import { colors } from "../../styles/colors";

export default function SettingsModal({
  isMobile,
  thresholds,
  setThresholds,
  setShowSettings
}) {

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    borderRadius: "10px",
    border: `1px solid ${colors.ui.borderLight}`,
    fontSize: "14px"
  };

  const card = {
    background: colors.background.card,
    border: `1px solid ${colors.ui.borderLight}`,
    boxShadow: colors.ui.shadowCard,
    padding: "18px",
    borderRadius: "14px"
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "20px"
    }}>
      <div style={{
        ...card,
        width: isMobile ? "100%" : "70%",
        padding: isMobile ? "16px" : "24px",
        maxWidth: "900px",
        borderRadius: "16px",
        boxShadow: colors.ui.shadowHover
      }}>

        {/* 🔝 HEADER */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}>
          <h3 style={{ margin: 0 }}>Personalized Thresholds</h3>

          <span
            onClick={() => setShowSettings(false)}
            style={{ cursor: "pointer", fontSize: "18px" }}
          >
            ✕
          </span>
        </div>

        {/* 📊 INPUT GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: "20px"
        }}>

          <div>
            <label>Heart Rate Max</label>
            <input
              type="number"
              value={thresholds.heartRate}
              onChange={(e) =>
                setThresholds({ ...thresholds, heartRate: Number(e.target.value) })
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>SpO2 Min (%)</label>
            <input
              type="number"
              value={thresholds.spo2}
              onChange={(e) =>
                setThresholds({ ...thresholds, spo2: Number(e.target.value) })
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>Temperature Max (°C)</label>
            <input
              type="number"
              value={thresholds.temperature}
              onChange={(e) =>
                setThresholds({ ...thresholds, temperature: Number(e.target.value) })
              }
              style={inputStyle}
            />
          </div>

        </div>

        {/* 🔘 BUTTONS */}
        <div style={{
          marginTop: "20px",
          display: "flex",
          gap: "12px"
        }}>

          <button 
            onClick={() => {
              setShowSettings(false);
              alert("Thresholds saved!");
            }}
            onMouseOver={(e) =>
              e.currentTarget.style.background = colors.brand.primaryHover
            }
            onMouseOut={(e) =>
              e.currentTarget.style.background = colors.status.success
            }
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              background: colors.status.success,
              color: colors.text.white,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}>
            <SaveIcon style={{ fontSize: "18px" }} />
            Save
          </button>

          <button
            onClick={() =>
              setThresholds({
                heartRate: 110,
                spo2: 92,
                temperature: 38
              })
            }
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: `1px solid ${colors.ui.borderLight}`,
              background: colors.background.card,
              cursor: "pointer"
            }}
          >
            Reset Defaults
          </button>

        </div>

      </div>
    </div>
  );
}