import LogoutIcon from "@mui/icons-material/Logout";
import { colors } from "../../styles/colors";

export default function Navbar({ isMobile, userName, selectedPatient }) {
  return (
    <div style={{
      background: colors.background.card,
      boxShadow: colors.ui.shadowCard,
      padding: isMobile ? "12px 16px" : "15px 30px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "10px" : "0",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
    }}>

      <h2 style={{ fontWeight: "700" }}>ElderEase</h2>
      
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        width: isMobile ? "100%" : "auto",
        justifyContent: isMobile ? "space-between" : "flex-end"
      }}>

        {/* 👤 Patient Info */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: "600" }}>
            {selectedPatient?.name || userName || "Margaret Johnson"}
          </div>
          <div style={{ fontSize: "12px", color: colors.text.secondary }}>
            Patient
          </div>
        </div>

        {/* 🚪 Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "none",
            background: colors.background.hover,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <LogoutIcon style={{ fontSize: "20px", color: colors.text.primary }} />
        </button>

      </div>
    </div>
  );
}