import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // 👈 important
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>
      
      {/* LOGO */}
      <div style={styles.logoBox}>
        <div style={{
          ...styles.logoIcon,
          width: isMobile ? "50px" : "60px",
          height: isMobile ? "50px" : "60px"
        }}>
          <FavoriteIcon style={{ fontSize: 28, color: "white" }} />
        </div>
        <h1 style={{
          margin: 0,
          fontSize: isMobile ? "22px" : "26px",
          fontWeight: "700"
        }}>
          ElderEase
        </h1>
        <p style={styles.subtitle}>
          Smart Elderly Health Monitoring
        </p>
      </div>

      {/* CARD */}
      <div style={styles.card}>
        
        {/* TOGGLE */}
        <div style={{
          ...styles.toggle,
          flexDirection: isMobile ? "column" : "row"
        }}>
          
          <button
            onClick={() => setRole("patient")}
            style={{
              ...styles.toggleBtn,
              width: isMobile ? "100%" : "auto",
              ...(role === "patient" && styles.activeBtn)
            }}
          >
            <FavoriteBorderIcon style={{ fontSize: 18 }} />
            Patient
          </button>

          <button
            onClick={() => setRole("caregiver")}
            style={{
              ...styles.toggleBtn,
              width: isMobile ? "100%" : "auto",
              ...(role === "caregiver" && styles.activeBtn)
            }}
          >
            <ShieldOutlinedIcon style={{ fontSize: 18 }} />
            Caregiver
          </button>

        </div>

        {/* FORM */}
        <div style={{ marginTop: "20px" }}>
          
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              role === "patient"
                ? "margaret@example.com"
                : "sarah@example.com"
            }
            style={styles.input}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={styles.input}
          />

          {/* BUTTON */}
          <button
            style={styles.loginBtn}
            onMouseOver={(e) => e.currentTarget.style.background = "#059669"}
            onMouseOut={(e) => e.currentTarget.style.background = "#10b981"}
            onClick={() => {
              const savedProfile = JSON.parse(localStorage.getItem("profile"));

              if (!savedProfile) {
                alert("No account found. Please sign up.");
                return;
              }

              if (
                email === savedProfile.email &&
                password === savedProfile.password
              ) {
                localStorage.setItem("userName", savedProfile.name);

                alert("Login successful!");

                navigate(
                  localStorage.getItem("role") === "caregiver"
                    ? "/caregiver"
                    : "/dashboard"
                );
              } else {
                alert("Invalid credentials");
              }
            }}
          >
            Sign In
          </button>
          
          <p style={{ marginTop: "10px", fontSize: "14px", textAlign: "center" }}>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ color: "#10b981", cursor: "pointer" }}
            >
              Sign up
            </span>
          </p>
    
        </div>

      </div>
    </div>
  );
}

const styles = {
 container: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px"
  },

  logoBox: {
    textAlign: "center",
    marginBottom: "20px"
  },

  logoIcon: {
    fontSize: "32px",
    background: "#10b981",
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 10px auto",
    color: "white"
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700"
  },

  subtitle: {
    marginTop: "6px",
    color: "#6b7280",
    fontSize: "14px"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },

  toggle: {
    display: "flex",
    flexDirection: "row", 
    gap: "10px"
  },

  toggleBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#e5e7eb",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontWeight: "500"
  },

  activeBtn: {
    background: "#10b981",
    color: "white"
  },

  label: {
    display: "block",
    marginTop: "12px",
    marginBottom: "4px",
    fontSize: "14px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    marginBottom: "10px",
    fontSize: "14px",
    boxSizing: "border-box"
  },

  loginBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#10b981",
    color: "white",
    marginTop: "12px",
    fontWeight: "600",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "0.2s"
  },

  demoText: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "12px",
    color: "#6b7280"
  }
};