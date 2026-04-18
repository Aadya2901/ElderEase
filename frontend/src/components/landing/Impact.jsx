import '../../styles/Impact.css'

const stats = [
  { value: "40%", label: "Faster Emergency Response", color: "primary" },
  { value: "85%", label: "Caregiver Satisfaction", color: "secondary" },
  { value: "24/7", label: "Continuous Monitoring", color: "primary" }
]

function Impact() {
  return (
    <section className="section impact">
      <div className="container">
        <div className="impact-content">
          <div className="impact-quote-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"></path>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
            </svg>
          </div>
          
          <div className="impact-quotes">
            <blockquote className="impact-quote-main">
              &ldquo;Early detection saves lives&rdquo;
            </blockquote>
            
            <div className="impact-divider"></div>
            
            <blockquote className="impact-quote-secondary">
              &ldquo;Real-time response reduces risk&rdquo;
            </blockquote>
          </div>

          <div className="impact-stats">
            {stats.map((stat, index) => (
              <div key={index} className="impact-stat card">
                <p className={`impact-stat-value ${stat.color === 'primary' ? 'stat-primary' : 'stat-secondary'}`}>
                  {stat.value}
                </p>
                <p className="impact-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Impact
