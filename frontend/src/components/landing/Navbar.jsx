import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : "transparent"}`}>
      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo">ElderEase</div>

        {/* DESKTOP */}
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>

          <button
            className="nav-btn btn-login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="nav-btn btn-signup"
            onClick={() => navigate("/")}
          >
            Sign Up
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <div className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>

      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#how">How It Works</a>

        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/")}>Sign Up</button>
      </div>
    </nav>
  );
}