import "../../styles/CTA.css";
import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();
  
  return (
    <section className="cta">
      <div className="cta-decorations">
        <div className="cta-decoration cta-decoration-top"></div>
        <div className="cta-decoration cta-decoration-bottom"></div>
      </div>
      
      <div className="container">
        <div className="cta-content">
          <span className="cta-badge">Get Started Today</span>
          
          <h2 className="cta-title">Start Monitoring Today</h2>
          
          <p className="cta-description">
            Join thousands of caregivers who trust ElderEase to keep their loved ones safe and healthy.
          </p>
          
          <div className="cta-buttons">
            <button 
              className="btn cta-btn-primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button 
              className="btn cta-btn-outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA;
