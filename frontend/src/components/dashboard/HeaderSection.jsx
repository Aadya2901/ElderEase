import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { colors } from "../../styles/colors";

export default function HeaderSection({
  isMobile,
  lastUpdated,
  status,
  setShowSettings,
  setData,
  setFallDetected,
  fallDetected,
  showSettings,        
  thresholds,  
  setThresholds
}) {
  return (
    <div style={{
      marginTop: "20px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "12px" : "0",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center"
    }}>

      {/* LEFT */}
      <div>
        <h1 style={{
          fontSize: isMobile ? "24px" : "28px",
          fontWeight: "700",
          margin: 0
        }}>
          My Health Dashboard
        </h1>

        <p style={{
          color: colors.text.secondary,
          marginTop: "4px",
          fontSize: "14px"
        }}>
          Real-time health monitoring
        </p>
        
        {/* ⚙ INLINE THRESHOLDS */}
        {showSettings && (
          <div style={{
            marginTop: "10px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap"
          }}>

            <span style={{ fontWeight: "600", fontSize: "13px" }}>
              Thresholds:
            </span>

            <input
              type="number"
              value={thresholds.heartRate}
              onChange={(e) =>
                setThresholds({ ...thresholds, heartRate: Number(e.target.value) })
              }
              style={{ width: "70px", padding: "6px" }}
            />

            <input
              type="number"
              value={thresholds.spo2}
              onChange={(e) =>
                setThresholds({ ...thresholds, spo2: Number(e.target.value) })
              }
              style={{ width: "70px", padding: "6px" }}
            />

            <input
              type="number"
              value={thresholds.temperature}
              onChange={(e) =>
                setThresholds({ ...thresholds, temperature: Number(e.target.value) })
              }
              style={{ width: "70px", padding: "6px" }}
            />

            <button
              onClick={() => setShowSettings(false)}
              style={{
                padding: "6px 10px",
                background: colors.status.success,
                color: "white",
                border: "none",
                borderRadius: "6px"
              }}
            >
              Save
            </button>

          </div>
        )}

        <div style={{
          marginTop: "6px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "13px",
          color: colors.text.secondary
        }}>
          <span>
            Last Updated: <strong style={{ color: colors.text.primary }}>{lastUpdated}</strong>
          </span>

          <span style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            borderRadius: "999px",
            background: colors.status.successBg,
            color: colors.status.success,
            fontWeight: "500"
          }}>
            ● Live Monitoring
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: isMobile ? "100%" : "auto",
        gap: isMobile ? "14px" : "12px",
        alignItems: isMobile ? "stretch" : "center"
      }}>

        {/* ⚙ SETTINGS */}
        <button
          onClick={() => setShowSettings(prev => !prev)}
          style={{
            padding: "8px 14px",
            borderRadius: "10px",
            border: "none",
            background: colors.background.hover,
            cursor: "pointer",
            boxShadow: colors.ui.shadowCard,
            fontWeight: "500"
          }}
        >
          ⚙ Custom Thresholds
        </button>

        {/* 🚨 SIMULATE */}
        <button
          onMouseOver={(e) =>
            e.currentTarget.style.background = "#dc2626"
          }
          onMouseOut={(e) =>
            e.currentTarget.style.background = colors.status.danger
          }
          onClick={() =>
            setData({ heartRate: 140, spo2: 85, temperature: 39 })
          }
          style={{
            padding: "8px 14px",
            borderRadius: "10px",
            border: "none",
            background: colors.status.danger,
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: colors.ui.shadowCard
          }}
        >
          <CrisisAlertIcon style={{ fontSize: "18px" }} />
          Simulate
        </button>

        {/* 🚨 FALL */}
        <button
          onClick={() => setFallDetected(true)}
          style={{
            padding: "10px 14px",
            background: colors.status.danger,
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          🚨 Simulate Fall
        </button>

        {/* ✅ RESET */}
        {fallDetected && (
          <button
            onClick={() => setFallDetected(false)}
            style={{
              padding: "8px 12px",
              background: colors.status.success,
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            ✅ Reset Fall
          </button>
        )}

        {/* STATUS */}
        <div style={{
          padding: "10px 20px",
          borderRadius: "999px",
          fontSize: "14px",
          fontWeight: "700",
          width: isMobile ? "100%" : "auto",
          textAlign: "center",
          background:
            status === "EMERGENCY" ? colors.status.dangerBg :
            status === "WARNING" ? colors.status.warningBg :
            colors.status.successBg,

          color:
            status === "EMERGENCY" ? colors.status.danger :
            status === "WARNING" ? colors.status.warning :
            colors.status.success
        }}>
          {status}
        </div>

      </div>
    </div>
  );
}