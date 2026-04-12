import { Wifi, Server, Brain, BellRing, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Wifi,
    title: "Data Collection",
    description: "IoT sensors and wearables collect vital health data continuously",
    color: "text-blue-500",
    bgColor: "bg-blue-100"
  },
  {
    icon: Server,
    title: "Backend Processing",
    description: "Secure cloud infrastructure processes and stores health data",
    color: "text-purple-500",
    bgColor: "bg-purple-100"
  },
  {
    icon: Brain,
    title: "Risk Detection + AI",
    description: "AI algorithms analyze data to detect anomalies and risks",
    color: "text-green-500",
    bgColor: "bg-green-100"
  },
  {
    icon: BellRing,
    title: "Caregiver Alert",
    description: "Instant notifications sent to caregivers for quick action",
    color: "text-orange-500",
    bgColor: "bg-orange-100"
  }
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 sm:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-sm font-medium text-secondary mb-6">
            Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            A seamless flow from data collection to caregiver action.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="group bg-card rounded-3xl p-8 text-center border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon className={`w-10 h-10 ${step.color}`} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-md border border-border">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
