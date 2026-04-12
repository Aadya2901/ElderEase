import { AlertTriangle, Eye, Clock, Activity, Bell, LayoutDashboard } from "lucide-react"

export function ProblemSolutionSection() {
  return (
    <section className="py-28 sm:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-muted rounded-full text-sm font-medium text-muted-foreground mb-6">
            Why ElderEase?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
            The Challenge & Our Solution
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Traditional care methods leave gaps. We fill them with technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Problem Card */}
          <div className="group bg-card rounded-3xl p-8 sm:p-10 border border-border shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-red-700">The Problem</h3>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg mb-1">Elderly Alone</p>
                  <p className="text-muted-foreground leading-relaxed">Many seniors live alone without immediate access to help when they need it most</p>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Bell className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg mb-1">No Quick Response</p>
                  <p className="text-muted-foreground leading-relaxed">Emergencies go unnoticed until it&apos;s too late for effective intervention</p>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg mb-1">No Visibility</p>
                  <p className="text-muted-foreground leading-relaxed">Caregivers can&apos;t monitor health status remotely or in real-time</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="group bg-card rounded-3xl p-8 sm:p-10 border border-border shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                <Activity className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-primary">Our Solution</h3>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg mb-1">Real-time Monitoring</p>
                  <p className="text-muted-foreground leading-relaxed">24/7 health vitals tracking with instant updates to keep you informed</p>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg mb-1">Smart Alerts</p>
                  <p className="text-muted-foreground leading-relaxed">AI-powered risk detection with immediate notifications to caregivers</p>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg mb-1">Caregiver Dashboard</p>
                  <p className="text-muted-foreground leading-relaxed">Comprehensive view of all patients in one intuitive interface</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
