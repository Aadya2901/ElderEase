import "../../styles/caregiver.css";
import { Users, AlertCircle, Zap } from "lucide-react";

export default function CaregiverSection() {

  const points = [
    {
      icon: Users,
      title: "Monitor Multiple Patients",
      description: "Manage all patients from one dashboard"
    },
    {
      icon: AlertCircle,
      title: "Prioritize Emergencies",
      description: "Focus on critical cases first"
    },
    {
      icon: Zap,
      title: "Take Quick Action",
      description: "Access contacts & history instantly"
    }
  ];

  const patients = [
    { name: "Margaret Johnson", status: "stable", age: 78 },
    { name: "Robert Williams", status: "warning", age: 82 },
    { name: "Elizabeth Davis", status: "stable", age: 75 }
  ];

  return (
    <section className="caregiver section">

    <div className="caregiver-container">

      {/* LEFT */}
      <div className="caregiver-left">

        <span className="caregiver-tag">
          For Healthcare Professionals
        </span>

        <h2 className="title caregiver-title">
          Built for Caregivers
        </h2>

        <p className="subtitle caregiver-desc">
          Designed to streamline remote monitoring and enable faster, smarter care decisions.
        </p>

        <div className="caregiver-list">
          {points.map((p, i) => {
            const Icon = p.icon;

            return (
              <div key={i} className="caregiver-item">

                <div className="icon-box">
                  <Icon size={22} />
                </div>

                <div>
                  <div className="item-title">{p.title}</div>
                  <div className="item-text">{p.description}</div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* RIGHT */}
      <div className="dashboard card">

        <div className="dashboard-header">
          <Users size={20} />
          <div>
            <div className="dash-title">Active Patients</div>
            <small>Real-time overview</small>
          </div>
        </div>

        {patients.map((p, i) => (
          <div key={i} className="patient">

            <div className="patient-left">
              <div className="avatar">
                {p.name.split(" ").map(n => n[0]).join("")}
              </div>

              <div>
                <div className="patient-name">{p.name}</div>
                <small>Age {p.age}</small>
              </div>
            </div>

            <div className={`status ${p.status}`}>
              {p.status === "stable" ? "Stable" : "Attention"}
            </div>

          </div>
        ))}

      </div>

    </div>

  </section>
  );
}