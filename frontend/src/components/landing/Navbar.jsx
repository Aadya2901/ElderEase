import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button"; 

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <span
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              ElderEase
            </span>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#home" className="text-sm font-medium hover:text-green-500">
              Home
            </a>

            <a href="#features" className="text-sm font-medium hover:text-green-500">
              Features
            </a>

            <a href="#how-it-works" className="text-sm font-medium hover:text-green-500">
              How It Works
            </a>

            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              onClick={() => navigate("/")}
              className="bg-green-500 text-white rounded-full px-6"
            >
              Sign Up
            </Button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={isScrolled ? "text-black" : "text-white"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-xl mt-2 p-4 shadow-lg">
            <a href="#home" className="block py-2">Home</a>
            <a href="#features" className="block py-2">Features</a>
            <a href="#how-it-works" className="block py-2">How It Works</a>

            <div className="flex flex-col gap-3 mt-3">
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/")}>Sign Up</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}