export function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-8 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ElderEase
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="hidden sm:inline text-sm text-muted-foreground">Remote Care Platform</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              About
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              Contact
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              Terms
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ElderEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
