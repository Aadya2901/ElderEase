import { useState } from 'react'
import "../../styles/Hero.css";

import { useNavigate } from "react-router-dom";

function Hero() {
  const [showVideo, setShowVideo] = useState(false)

  const navigate = useNavigate();

  return (
    <section id="home" className="hero">
      {/* Background Image */}
      <div className="hero-background">
        <img
          src="/images/hero-bg.jpg"
          alt="Modern healthcare facility"
          className="hero-bg-image"
        />
        <div className="hero-overlay hero-overlay-bottom"></div>
        <div className="hero-overlay hero-overlay-sides"></div>
        <div className="hero-overlay hero-overlay-top"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-card">
          <h1 className="hero-title">
            REMOTE CARE FOR YOUR
            <br />
            <span className="hero-title-gradient">LOVED ONES</span>
          </h1>

          <p className="hero-subtitle">Anytime, Anywhere</p>

          <p className="hero-description">
            Monitor health, detect risks, stay connected
          </p>

          {/* Play Button */}
          <button
            onClick={() => setShowVideo(true)}
            className="hero-play-button"
            aria-label="Play demo video"
          >
            <div className="hero-play-glow"></div>
            <div className="hero-play-border">
              <div className="hero-play-inner">
                <svg className="hero-play-icon" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
            <div className="hero-play-pulse"></div>
          </button>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>

            <button
              className="btn btn-outline btn-lg"
              onClick={() => setShowVideo(true)}
            >
              View Demo
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="hero-modal" onClick={() => setShowVideo(false)}>
          <div className="hero-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideo(false)}
              className="hero-modal-close"
              aria-label="Close video"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="hero-video-container">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/woX8x3tkNR4"
                title="Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero



