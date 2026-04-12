import { Heart, Bell, Brain, Users, TrendingUp, BellRing } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Vitals Monitoring",
    description: "Track heart rate, blood oxygen, temperature, and more in real-time with clinical accuracy.",
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "group-hover:border-red-200"
  },
  {
    icon: Bell,
    title: "Alerts System",
    description: "Instant notifications when vitals go outside safe ranges or unusual patterns are detected.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "group-hover:border-orange-200"
  },
  {
    icon: Brain,
    title: "AI Insights",
    description: "Machine learning algorithms analyze patterns to predict potential health risks early.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "group-hover:border-purple-200"
  },
  {
    icon: Users,
    title: "Caregiver Dashboard",
    description: "Manage multiple patients from a single, intuitive interface designed for efficiency.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "group-hover:border-blue-200"
  },
  {
    icon: TrendingUp,
    title: "Health Trends",
    description: "Visualize health data over time to identify trends and measure improvement.",
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "group-hover:border-green-200"
  },
  {
    icon: BellRing,
    title: "Notifications",
    description: "Customizable alerts via SMS, email, or push notifications for caregivers and family.",
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    borderColor: "group-hover:border-teal-200"
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 sm:py-32 px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            Features
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
            Powerful Features for Complete Care
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to monitor, protect, and care for your loved ones remotely.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${feature.borderColor}`}
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
