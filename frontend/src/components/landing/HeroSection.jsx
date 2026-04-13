import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "../../styles/hero.css";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero section">

      {/* BACKGROUND */}
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1581595219315-a187dd40c322"
          alt="healthcare"
        />
        <div className="overlay-dark"></div>
      </div>

      {/* CONTENT */}
      <div className="hero-content">

        <div className="glass-card">

          <h1 className="hero-title">
            REMOTE CARE FOR YOUR <br />
            <span className="gradient-text">LOVED ONES</span>
          </h1>

          <p className="hero-sub">Anytime, Anywhere</p>

          <p className="hero-desc">
            Monitor health, detect risks, stay connected
          </p>

          <div className="hero-buttons">

            <button
              className="btn-primary hero-btn"
              onClick={() => navigate("/login")}
            >
              Get Started
              <ArrowRight size={18} className="arrow" />
            </button>

            <button className="btn-outline hero-btn">
              View Demo
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}