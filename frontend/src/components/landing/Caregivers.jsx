import "../../styles/Caregivers.css";

const points = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: "Monitor Multiple Patients",
    description: "Manage all your patients from a single dashboard with customizable views and filters."
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    ),
    title: "Prioritize Emergencies",
    description: "Smart triage system highlights critical cases so you can focus on what matters most."
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
    title: "Take Quick Action",
    description: "One-click access to emergency contacts, medical history, and care protocols."
  }
]

const patients = [
  { name: "Margaret Johnson", status: "stable", age: 78 },
  { name: "Robert Williams", status: "attention", age: 82 },
  { name: "Elizabeth Davis", status: "stable", age: 75 }
]

function Caregivers() {
  return (
    <section className="section caregivers">
      <div className="container">
        <div className="caregivers-grid">
          <div className="caregivers-content">
            <span className="badge">For Healthcare Professionals</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginTop: '1.5rem' }}>
              Built for Caregivers
            </h2>
            <p className="caregivers-description">
              Designed with healthcare professionals in mind, our platform streamlines remote patient monitoring and enables faster, smarter care decisions.
            </p>

            <ul className="caregivers-list">
              {points.map((point, index) => (
                <li key={index} className="caregivers-list-item">
                  <div className="caregivers-list-icon">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="caregivers-list-title">{point.title}</h4>
                    <p className="caregivers-list-description">{point.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="caregivers-dashboard-wrapper">
            <div className="caregivers-dashboard card">
              <div className="dashboard-header">
                <div className="dashboard-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="dashboard-title">Active Patients</h4>
                  <p className="dashboard-subtitle">Real-time overview</p>
                </div>
              </div>

              <div className="patient-list">
                {patients.map((patient, index) => (
                  <div key={index} className="patient-item">
                    <div className="patient-info">
                      <div className="patient-avatar">
                        {patient.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="patient-name">{patient.name}</p>
                        <p className="patient-age">Age {patient.age}</p>
                      </div>
                    </div>
                    <div className={`patient-status ${patient.status === "stable" ? "status-stable" : "status-attention"}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {patient.status === "stable" ? "Stable" : "Attention"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="dashboard-shadow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Caregivers
