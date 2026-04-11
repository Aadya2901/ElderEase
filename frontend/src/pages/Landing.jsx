import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>ElderEase</h2>

        <div style={styles.navLinks}>
          <span>Home</span>
          <span>Features</span>
          <span>How It Works</span>

          <button style={styles.loginBtn} onClick={() => navigate("/login")}>
            Login
          </button>

          <button style={styles.signupBtn} onClick={() => navigate("/login")}>
            Sign Up
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          AI-Powered Remote Care for Your Loved Ones
        </h1>

        <p style={styles.heroText}>
          Monitor health, detect risks early, and stay connected in real-time.
        </p>

        <div style={styles.btnGroup}>
          <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
            Get Started
          </button>

          <button style={styles.secondaryBtn}>
            View Demo
          </button>
        </div>

        <p style={styles.liveText}>🟢 128 elders monitored live</p>
      </div>

      {/* PROBLEM / SOLUTION */}
      <div style={styles.section}>
        <div style={styles.grid2}>
          <div style={styles.card}>
            <h3>Problem</h3>
            <p>• Elderly living alone</p>
            <p>• Delayed emergency response</p>
            <p>• No real-time visibility</p>
          </div>

          <div style={styles.card}>
            <h3>Solution</h3>
            <p>• Real-time monitoring</p>
            <p>• Smart alerts 🚨</p>
            <p>• Caregiver dashboard</p>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={styles.section}>
        <h2>Features</h2>

        <div style={styles.grid3}>
          <div style={styles.featureCard}>❤️ Vitals Monitoring</div>
          <div style={styles.featureCard}>🚨 Emergency Alerts</div>
          <div style={styles.featureCard}>🧠 AI Insights</div>
          <div style={styles.featureCard}>📊 Health Trends</div>
          <div style={styles.featureCard}>🔔 Notifications</div>
          <div style={styles.featureCard}>👨‍👩‍👧 Caregiver Dashboard</div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={styles.section}>
        <h2>How It Works</h2>

        <div style={styles.flow}>
          <span>📡 Data</span> →
          <span>⚙ Backend</span> →
          <span>🧠 AI</span> →
          <span>🚨 Alerts</span>
        </div>
      </div>

      {/* CAREGIVER SECTION */}
      <div style={styles.section}>
        <h2>Built for Caregivers</h2>

        <p>• Monitor multiple patients</p>
        <p>• Prioritize emergencies</p>
        <p>• Take quick action</p>
      </div>

      {/* IMPACT */}
      <div style={styles.section}>
        <h2>Why ElderEase?</h2>

        <p>✔ Early risk detection</p>
        <p>✔ Faster emergency response</p>
        <p>✔ Peace of mind for families</p>
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <h2>Start Monitoring Today</h2>

        <div style={styles.btnGroup}>
          <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
            Sign Up
          </button>

          <button style={styles.secondaryBtn} onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <span>About</span>
        <span>Contact</span>
        <span>Privacy</span>
        <span>Terms</span>
      </div>

    </div>
  );
}

const styles = {
  container: {
    background: "#F4F7FA",
    minHeight: "100vh",
    color: "#1A202C",
    fontFamily: "sans-serif"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    background: "#FFFFFF",
    position: "sticky",
    top: 0
  },

  logo: {
    color: "#1F3A5F"
  },

  navLinks: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  },

  loginBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer"
  },

  signupBtn: {
    background: "#1F3A5F",
    color: "white",
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  },

  hero: {
    textAlign: "center",
    padding: "80px 20px"
  },

  heroTitle: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1F3A5F"
  },

  heroText: {
    color: "#6FA9C9",
    marginTop: "10px"
  },

  liveText: {
    marginTop: "15px",
    color: "#1F3A5F"
  },

  btnGroup: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    justifyContent: "center"
  },

  primaryBtn: {
    background: "#1F3A5F",
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer"
  },

  secondaryBtn: {
    border: "1px solid #1F3A5F",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    background: "white"
  },

  section: {
    padding: "60px 20px",
    textAlign: "center"
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    maxWidth: "800px",
    margin: "auto"
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
    maxWidth: "900px",
    margin: "auto",
    marginTop: "20px"
  },

  card: {
    background: "#FFFFFF",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  },

  featureCard: {
    background: "#FFFFFF",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #A7D3E0"
  },

  flow: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap"
  },

  cta: {
    background: "#1F3A5F",
    color: "white",
      padding: "60px 20px",
    textAlign: "center"
  },

  footer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
    background: "#FFFFFF"
  }
};