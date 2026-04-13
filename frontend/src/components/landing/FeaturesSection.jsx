import "../../styles/features.css";
import { Heart, Bell, Brain, Users, TrendingUp, BellRing } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Vitals Monitoring",
    description: "Track heart rate, blood oxygen, temperature in real-time."
  },
  {
    icon: Bell,
    title: "Alerts System",
    description: "Instant alerts when vitals go outside safe ranges."
  },
  {
    icon: Brain,
    title: "AI Insights",
    description: "AI predicts potential health risks early."
  },
  {
    icon: Users,
    title: "Caregiver Dashboard",
    description: "Manage multiple patients easily."
  },
  {
    icon: TrendingUp,
    title: "Health Trends",
    description: "Track health data trends over time."
  },
  {
    icon: BellRing,
    title: "Notifications",
    description: "Custom alerts via SMS, email, or push."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="features section">

      <div className="features-container">

        {/* HEADER */}
        <div className="features-header">

          <span className="features-tag">Features</span>

          <h2 className="title">
            Powerful Features for Complete Care
          </h2>

          <p className="subtitle">
            Everything you need to monitor, protect, and care for your loved ones remotely.
          </p>

        </div>

        {/* GRID */}
        <div className="features-grid">

          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <div key={i} className="feature-card">

                <div className="feature-icon">
                  <Icon size={28} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}