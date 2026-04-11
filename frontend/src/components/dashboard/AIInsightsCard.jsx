import { colors } from "../../styles/colors";

export default function AIInsightsCard({ riskLevel, insights }) {

  const getRiskStyles = () => {
    if (riskLevel === "HIGH") {
      return {
        bg: colors.status.dangerBg,
        color: colors.status.danger
      };
    }
    if (riskLevel === "MEDIUM") {
      return {
        bg: colors.status.warningBg,
        color: colors.status.warning
      };
    }
    return {
      bg: colors.status.successBg,
      color: colors.status.success
    };
  };

  const riskStyle = getRiskStyles();

  const getRecommendations = () => {
    if (riskLevel === "HIGH") {
      return [
        "Contact caregiver immediately",
        "Check oxygen supply"
      ];
    }
    if (riskLevel === "MEDIUM") {
      return [
        "Monitor vitals closely",
        "Ensure proper hydration"
      ];
    }
    return ["No immediate action required"];
  };

  return (
    <div style={{
      marginTop: "20px",
      background: colors.background.card,
      boxShadow: colors.ui.shadowCard,
      borderRadius: "14px",
      padding: "18px"
    }}>

      {/* 🧠 AI TAG */}
      <div style={{
        fontSize: "12px",
        color: colors.brand.secondary,
        fontWeight: "600",
        marginBottom: "4px"
      }}>
        AI POWERED ANALYSIS
      </div>

      {/* 🧠 TITLE */}
      <h3 style={{
        fontWeight: "700",
        marginBottom: "10px"
      }}>
        🧠 AI Health Analysis
      </h3>

      {/* 🔴 RISK LEVEL */}
      <div style={{ marginBottom: "10px" }}>
        <strong>Risk Level: </strong>
        <span style={{
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: "600",
          background: riskStyle.bg,
          color: riskStyle.color
        }}>
          {riskLevel}
        </span>
      </div>

      {/* 📋 RECOMMENDATIONS */}
      <div style={{ marginBottom: "10px" }}>
        <strong>AI Recommendation:</strong>
        <ul style={{ marginTop: "6px", paddingLeft: "18px" }}>
          {getRecommendations().map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* DIVIDER */}
      <div style={{
        margin: "12px 0",
        height: "1px",
        background: colors.ui.borderLight
      }} />

      {/* 💡 INSIGHTS LIST */}
      {insights.map((msg, i) => {
        const isDanger = msg.includes("🚨");
        const isWarning = msg.includes("⚠");

        return (
          <div
            key={i}
            style={{
              marginTop: "10px",
              padding: "12px 14px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",

              background:
                isDanger ? colors.status.dangerBg :
                isWarning ? colors.status.warningBg :
                colors.status.successBg,

              color:
                isDanger ? colors.status.danger :
                isWarning ? colors.status.warning :
                colors.status.success,

              border:
                isDanger
                  ? `1px solid ${colors.status.danger}`
                  : isWarning
                  ? `1px solid ${colors.status.warning}`
                  : `1px solid ${colors.status.success}`,
            }}
          >
            <span style={{ fontWeight: "500" }}>
              {msg
                .replace("🚨", "")
                .replace("⚠", "")
                .replace("📉", "")
                .replace("📈", "")
                .replace("📩", "")
                .replace("✅", "")
              }
            </span>
          </div>
        );
      })}
    </div>
  );
}