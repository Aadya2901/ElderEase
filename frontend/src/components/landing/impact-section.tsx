import { Quote } from "lucide-react"

export function ImpactSection() {
  return (
    <section className="py-28 sm:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-10">
          <Quote className="w-10 h-10 text-primary" />
        </div>
        
        <div className="space-y-10">
          <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-tight text-balance">
            &ldquo;Early detection saves lives&rdquo;
          </blockquote>
          
          <div className="w-32 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          
          <blockquote className="text-2xl sm:text-3xl text-muted-foreground font-light text-balance">
            &ldquo;Real-time response reduces risk&rdquo;
          </blockquote>
        </div>

        <div className="mt-20 grid sm:grid-cols-3 gap-8 lg:gap-12">
          <div className="p-8 bg-card rounded-3xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <p className="text-5xl lg:text-6xl font-bold text-primary mb-3">40%</p>
            <p className="text-muted-foreground text-lg">Faster Emergency Response</p>
          </div>
          <div className="p-8 bg-card rounded-3xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <p className="text-5xl lg:text-6xl font-bold text-secondary mb-3">85%</p>
            <p className="text-muted-foreground text-lg">Caregiver Satisfaction</p>
          </div>
          <div className="p-8 bg-card rounded-3xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <p className="text-5xl lg:text-6xl font-bold text-primary mb-3">24/7</p>
            <p className="text-muted-foreground text-lg">Continuous Monitoring</p>
          </div>
        </div>
      </div>
    </section>
  )
}
