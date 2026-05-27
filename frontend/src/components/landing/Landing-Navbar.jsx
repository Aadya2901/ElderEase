import { useState, useEffect } from 'react'
import '../../styles/landing/Landing-Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`landing-navbar ${isScrolled ? 'landing-navbar-scrolled' : ''}`}>
      <div className="landing-navbar-container">
        <div className="landing-navbar-content">
          <a href="#home" className="landing-navbar-logo">
            ElderEase
          </a>
          
          <div className="landing-navbar-links">
            <a href="#home" className={`landing-navbar-link ${isScrolled ? 'scrolled' : ''}`}>
              Home
            </a>
            <a href="#features" className={`landing-navbar-link ${isScrolled ? 'scrolled' : ''}`}>
              Features
            </a>
            <a href="#how-it-works" className={`landing-navbar-link ${isScrolled ? 'scrolled' : ''}`}>
              How It Works
            </a>
            <button className={`btn btn-ghost landing-navbar-login ${isScrolled ? 'scrolled' : ''}`}>
              Login
            </button>
            <button className="btn btn-primary landing-navbar-signup">
              Sign Up
            </button>
          </div>

          <button
            className={`landing-navbar-toggle ${isScrolled ? 'scrolled' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="landing-navbar-mobile">
            <a href="#home" className="landing-navbar-mobile-link" onClick={() => setIsOpen(false)}>
              Home
            </a>
            <a href="#features" className="landing-navbar-mobile-link" onClick={() => setIsOpen(false)}>
              Features
            </a>
            <a href="#how-it-works" className="landing-navbar-mobile-link" onClick={() => setIsOpen(false)}>
              How It Works
            </a>
            <div className="landing-navbar-mobile-buttons">
              <button className="btn btn-ghost">Login</button>
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
