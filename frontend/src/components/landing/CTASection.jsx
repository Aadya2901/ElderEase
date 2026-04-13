import "../../styles/cta.css";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {

  const navigate = useNavigate();

  return (
    <section className="cta section">

      {/* 🔥 Glow Background */}
      <div className="cta-bg"></div>

      <div className="cta-container">

        <span className="cta-tag">Get Started Today</span>

        <h2 className="cta-title">
          Start Monitoring Your Loved Ones Today
        </h2>

        <p className="cta-text">
          Join caregivers who trust ElderEase to keep loved ones safe.
        </p>

        <div className="cta-buttons">

          <button
            className="cta-btn cta-primary"
            onClick={() => navigate("/signup")}
          >
            Sign Up
            <ArrowRight className="arrow" size={18} />
          </button>

          <button
            className="cta-btn cta-secondary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </div>

    </section>
  );
}