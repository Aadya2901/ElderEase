import "../../styles/howitworks.css";
import { Wifi, Server, Brain, BellRing, ArrowRight } from "lucide-react";

export default function HowItWorksSection() {

  const steps = [
    {
      icon: Wifi,
      title: "Data Collection",
      description: "IoT sensors and wearables collect vital health data continuously",
      color: "#3b82f6",
      bg: "#dbeafe"
    },
    {
      icon: Server,
      title: "Backend Processing",
      description: "Secure cloud infrastructure processes and stores health data",
      color: "#8b5cf6",
      bg: "#ede9fe"
    },
    {
      icon: Brain,
      title: "Risk Detection + AI",
      description: "AI algorithms analyze data to detect anomalies and risks",
      color: "#22c55e",
      bg: "#dcfce7"
    },
    {
      icon: BellRing,
      title: "Caregiver Alert",
      description: "Instant notifications sent to caregivers for quick action",
      color: "#f97316",
      bg: "#ffedd5"
    }
  ];

  return (
    <section id="how section" className="how">

      <div className="how-container">

        {/* HEADER */}
        <div className="how-header">
          <span className="how-tag">Process</span>
          <h2 className="how-title">How It Works</h2>
          <p className="how-desc">
            A seamless flow from data collection to caregiver action.
          </p>
        </div>

        {/* GRID */}
        <div className="how-grid">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={index} className="how-card">

                {/* NUMBER */}
                <div className="step-number">{index + 1}</div>

                {/* ICON */}
                <div
                  className="how-icon"
                  style={{ background: step.bg }}
                >
                  <Icon size={32} color={step.color} />
                </div>

                <div className="how-step-title">{step.title}</div>
                <div className="how-step-text">{step.description}</div>

                {/* ARROW */}
                {index < steps.length - 1 && (
                  <div className="arrow">
                    <div className="arrow-circle">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}