import { colors } from "../../styles/colors";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BoltIcon from "@mui/icons-material/Bolt";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function AIInsightsCard({ riskLevel, explanation, medical, actions }) {

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

  const getRiskIcon = () => {
    if (riskLevel === "HIGH") return <ErrorIcon style={{ color: colors.status.danger }} />;
    if (riskLevel === "MEDIUM") return <WarningIcon style={{ color: colors.status.warning }} />;
    return <CheckCircleIcon style={{ color: colors.status.success }} />;
  };

  const iconStyle = { fontSize: "18px" };
  
  return (
    <div style={{
      marginTop: "20px",
      background: colors.background.card,
      boxShadow: colors.ui.shadowCard,
      borderRadius: "14px",
      padding: "18px",
      transition: "all 0.3s ease",

      animation: riskLevel === "HIGH"
        ? "pulse 1.4s ease-out infinite"
        : "none",

      borderLeft: riskLevel === "HIGH"
        ? `4px solid ${colors.status.danger}`
        : "none",
    }}>

      {/* 🧠 AI TAG */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
        color: colors.brand.secondary,
        fontWeight: "600",
        marginBottom: "4px"
      }}>
        <PsychologyIcon style={iconStyle} />
        AI POWERED ANALYSIS
      </div>

      {/* TITLE */}
      <h3 style={{
        fontWeight: "700",
        marginBottom: "14px"
      }}>
        🧠 AI Health Analysis
      </h3>

      <div style={{
        fontSize: "13px",
        color: colors.text.muted,
        marginBottom: "14px"
      }}>
        Real-time AI-powered patient analysis
      </div>

      {/* 🔴 RISK LEVEL */}
      <div style={{
        marginBottom: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
        {getRiskIcon()}

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

      {/* 🧠 EXPLANATION */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <PsychologyIcon style={iconStyle} />
          <strong>AI Explanation</strong>
        </div>

        <p style={{ marginTop: "4px", color: colors.text.secondary }}>
          {explanation || "Analyzing patient condition..."}
        </p>
      </div>

      {/* 🏥 MEDICAL */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <LocalHospitalIcon style={iconStyle} />
          <strong>Medical Insight</strong>
        </div>

        <p style={{ marginTop: "4px", color: colors.text.secondary }}>
          {medical || "Generating medical insights..."}
        </p>
      </div>

      {/* ⚡ ACTIONS */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <BoltIcon style={iconStyle} />
          <strong>Recommended Actions</strong>
        </div>

        <ul style={{ marginTop: "6px", paddingLeft: "18px" }}>
          {(actions?.length ? actions : ["Analyzing recommendations..."]).map((act, i) => (
            <li key={i}>{act}</li>
          ))}
        </ul>
      </div>

      <style>
      {`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}
    </style>

    </div>
  );
}