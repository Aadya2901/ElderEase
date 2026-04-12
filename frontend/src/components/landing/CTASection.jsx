import "../../styles/cta.css";
import { useNavigate } from "react-router-dom";

export default function CTASection() {

  const navigate = useNavigate();

  return (
    <section className="cta">

      <div className="cta-container">

        <h2 className="cta-title">
          Start Monitoring Your Loved Ones Today
        </h2>

        <p className="cta-text">
          Take the first step towards smarter, safer elderly care.
        </p>

        <div className="cta-buttons">

          <button
            className="cta-btn cta-primary"
            onClick={() => navigate("/signup")}
          >
            Sign Up
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