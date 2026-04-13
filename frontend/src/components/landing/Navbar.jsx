import { useState, useEffect } from 'react';
import '../../styles/Navbar.css';

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <a href="#home" className="navbar-logo">
            ElderEase
          </a>
          
          <div className="navbar-links">
            <a href="#home" className={`navbar-link ${isScrolled ? 'scrolled' : ''}`}>
              Home
            </a>
            <a href="#features" className={`navbar-link ${isScrolled ? 'scrolled' : ''}`}>
              Features
            </a>
            <a href="#how-it-works" className={`navbar-link ${isScrolled ? 'scrolled' : ''}`}>
              How It Works
            </a>
            <button
              className="btn btn-ghost"
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
            >
              Login
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/signup");
                setIsOpen(false);
              }}
            >
              Sign Up
            </button>
          </div>

          <button
            className={`navbar-toggle ${isScrolled ? 'scrolled' : ''}`}
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
          <div className="navbar-mobile">
            <a href="#home" className="navbar-mobile-link" onClick={() => setIsOpen(false)}>
              Home
            </a>
            <a href="#features" className="navbar-mobile-link" onClick={() => setIsOpen(false)}>
              Features
            </a>
            <a href="#how-it-works" className="navbar-mobile-link" onClick={() => setIsOpen(false)}>
              How It Works
            </a>
            <div className="navbar-mobile-buttons">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
              >
                Login
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/signup");
                  setIsOpen(false);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
