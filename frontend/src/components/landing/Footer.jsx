import '../../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">ElderEase</span>
            <span className="footer-divider">|</span>
            <span className="footer-tagline">Remote Care Platform</span>
          </div>

          <nav className="footer-nav">
            <a href="#" className="footer-link">About</a>
            <a href="#" className="footer-link">Contact</a>
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
          </nav>

          <p className="footer-copyright">
            &copy; {currentYear} ElderEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
