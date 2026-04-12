import { Users, AlertCircle, Zap, CheckCircle } from "lucide-react"

const points = [
  {
    icon: Users,
    title: "Monitor Multiple Patients",
    description: "Manage all your patients from a single dashboard with customizable views and filters."
  },
  {
    icon: AlertCircle,
    title: "Prioritize Emergencies",
    description: "Smart triage system highlights critical cases so you can focus on what matters most."
  },
  {
    icon: Zap,
    title: "Take Quick Action",
    description: "One-click access to emergency contacts, medical history, and care protocols."
  }
]

export function CaregiversSection() {
  return (
    <section className="py-28 sm:py-32 px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              For Healthcare Professionals
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-8 text-balance">
              Built for Caregivers
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Designed with healthcare professionals in mind, our platform streamlines remote patient monitoring and enables faster, smarter care decisions.
            </p>

            <ul className="space-y-8">
              {points.map((point) => (
                <li key={point.title} className="flex gap-5">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg mb-2">{point.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="bg-card rounded-3xl shadow-2xl p-8 border border-border">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-lg">Active Patients</h4>
                  <p className="text-sm text-muted-foreground">Real-time overview</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Margaret Johnson", status: "stable", age: 78 },
                  { name: "Robert Williams", status: "attention", age: 82 },
                  { name: "Elizabeth Davis", status: "stable", age: 75 }
                ].map((patient) => (
                  <div
                    key={patient.name}
                    className="flex items-center justify-between p-5 bg-muted rounded-2xl hover:bg-muted/80 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <span className="text-secondary font-semibold">
                          {patient.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">Age {patient.age}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                      patient.status === "stable" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                      {patient.status === "stable" ? "Stable" : "Attention"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
