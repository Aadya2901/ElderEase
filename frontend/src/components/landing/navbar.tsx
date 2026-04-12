import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled 
                ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" 
                : "text-white"
            }`}>
              ElderEase
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a 
              href="#home" 
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                isScrolled ? "text-foreground" : "text-white/90 hover:text-white"
              }`}
            >
              Home
            </a>
            <a 
              href="#features" 
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                isScrolled ? "text-muted-foreground" : "text-white/80 hover:text-white"
              }`}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                isScrolled ? "text-muted-foreground" : "text-white/80 hover:text-white"
              }`}
            >
              How It Works
            </a>
            <Button 
              variant="ghost" 
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled 
                  ? "text-muted-foreground hover:text-primary" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Login
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign Up
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6 space-y-2 bg-card/95 backdrop-blur-md rounded-2xl mt-2 p-4 shadow-xl border border-border">
            <a href="#home" className="block px-4 py-3 text-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted">
              Home
            </a>
            <a href="#features" className="block px-4 py-3 text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted">
              Features
            </a>
            <a href="#how-it-works" className="block px-4 py-3 text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted">
              How It Works
            </a>
            <div className="flex flex-col gap-3 px-4 pt-4">
              <Button variant="ghost" className="justify-start text-muted-foreground">
                Login
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
