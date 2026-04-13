import "../../styles/impact.css";
import { Quote } from "lucide-react";

export default function ImpactSection() {

  const stats = [
    { value: "40%", text: "Faster Emergency Response" },
    { value: "85%", text: "Caregiver Satisfaction" },
    { value: "24/7", text: "Continuous Monitoring" }
  ];

  return (
    <section className="impact section">

      <div className="impact-container">

        {/* ICON */}
        <div className="impact-icon">
          <Quote size={35} color="#2563eb" />
        </div>

        {/* QUOTES */}
        <div className="impact-quote-main">
          “Early detection saves lives”
        </div>

        <div className="impact-divider"></div>

        <div className="impact-quote-sub">
          “Real-time response reduces risk”
        </div>

        {/* STATS */}
        <div className="impact-stats">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-number">{s.value}</div>
              <div className="stat-text">{s.text}</div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}