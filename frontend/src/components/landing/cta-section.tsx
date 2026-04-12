import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-28 sm:py-32 px-6 lg:px-8 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium text-white/90 mb-8">
          Get Started Today
        </span>
        
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-white mb-8 text-balance leading-tight">
          Start Monitoring Today
        </h2>
        
        <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of caregivers who trust ElderEase to keep their loved ones safe and healthy.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/95 px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            Sign Up
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-10 py-7 text-lg rounded-full transition-all duration-300 hover:scale-105"
          >
            Login
          </Button>
        </div>
      </div>
    </section>
  )
}
