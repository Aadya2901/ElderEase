import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/hero.css";

export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="hero">

      {/* BACKGROUND */}
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1581595219315-a187dd40c322"
          alt="healthcare"
        />
        <div className="overlay-top"></div>
        <div className="overlay-dark"></div>
      </div>

      {/* CONTENT */}
      <div className="hero-content">
        <div className="glass-card">

          <h1 className="hero-title">
            REMOTE CARE FOR YOUR <br />
            <span>LOVED ONES</span>
          </h1>

          <p className="hero-sub">Anytime, Anywhere</p>

          <p className="hero-desc">
            Monitor health, detect risks, stay connected
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>

            <button className="btn-outline">
              View Demo
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}