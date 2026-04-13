import '../../styles/ProblemSolution.css';

const problems = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    title: "Elderly Alone",
    description: "Many seniors live alone without immediate access to help when they need it most"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ),
    title: "No Quick Response",
    description: "Emergencies go unnoticed until it's too late for effective intervention"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    title: "No Visibility",
    description: "Caregivers can't monitor health status remotely or in real-time"
  }
]

const solutions = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
    title: "Real-time Monitoring",
    description: "24/7 health vitals tracking with instant updates to keep you informed"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ),
    title: "Smart Alerts",
    description: "AI-powered risk detection with immediate notifications to caregivers"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    title: "Caregiver Dashboard",
    description: "Comprehensive view of all patients in one intuitive interface"
  }
]

function ProblemSolution() {
  return (
    <section className="section problem-solution">
      <div className="container">
        <div className="section-header">
          <span className="badge">Why ElderEase?</span>
          <h2 className="section-title">The Challenge & Our Solution</h2>
          <p className="section-description">
            Traditional care methods leave gaps. We fill them with technology.
          </p>
        </div>

        <div className="problem-solution-grid">
          {/* Problem Card */}
          <div className="ps-card ps-card-problem">
            <div className="ps-card-header">
              <div className="ps-card-icon ps-card-icon-problem">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3 className="ps-card-title ps-card-title-problem">The Problem</h3>
            </div>
            
            <ul className="ps-list">
              {problems.map((item, index) => (
                <li key={index} className="ps-list-item">
                  <div className="ps-list-icon ps-list-icon-problem">
                    {item.icon}
                  </div>
                  <div className="ps-list-content">
                    <p className="ps-list-title">{item.title}</p>
                    <p className="ps-list-description">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div className="ps-card ps-card-solution">
            <div className="ps-card-header">
              <div className="ps-card-icon ps-card-icon-solution">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="ps-card-title ps-card-title-solution">Our Solution</h3>
            </div>
            
            <ul className="ps-list">
              {solutions.map((item, index) => (
                <li key={index} className="ps-list-item">
                  <div className="ps-list-icon ps-list-icon-solution">
                    {item.icon}
                  </div>
                  <div className="ps-list-content">
                    <p className="ps-list-title">{item.title}</p>
                    <p className="ps-list-description">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSolution
