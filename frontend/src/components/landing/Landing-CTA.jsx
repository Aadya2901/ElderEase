import '../../styles/landing/Landing-CTA.css'

function CTA() {
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
            <a href="#dashboard" className="btn cta-btn-primary">
              Open Dashboard
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <button className="btn cta-btn-outline">
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
