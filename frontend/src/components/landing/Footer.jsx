import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer section">

      <div className="footer-container">

        <div className="footer-row">

          {/* BRAND */}
          <div className="footer-brand">
            <span className="brand-name">ElderEase</span>

            <span className="brand-divider">|</span>

            <span className="brand-sub">
              Remote Care Platform
            </span>
          </div>

          {/* NAV */}
          <nav className="footer-nav">
            <a href="#" className="footer-link">About</a>
            <a href="#" className="footer-link">Contact</a>
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
          </nav>

          {/* COPYRIGHT */}
          <p className="footer-copy">
            © {new Date().getFullYear()} ElderEase. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}