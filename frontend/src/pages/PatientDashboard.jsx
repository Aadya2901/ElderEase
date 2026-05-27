import { useState } from 'react'
import '../styles/patient/PatientDashboard.css';

function PatientDashboard() {
  const [patientData] = useState({
    name: 'Margaret',
    lastUpdated: '2 minutes ago',
    healthScore: 85,
    healthStatus: 'normal', // 'normal', 'warning', 'emergency'
    vitals: {
      heartRate: { value: 72, unit: 'bpm', status: 'normal', trend: 'stable' },
      spo2: { value: 97, unit: '%', status: 'normal', trend: 'up' },
      temperature: { value: 98.2, unit: '°F', status: 'normal', trend: 'stable' }
    },
    aiInsight: "Your health looks great today! Your heart rate and oxygen levels are normal. Keep staying hydrated and take your afternoon walk.",
    medications: [
      { time: '8:00 AM', name: 'Blood Pressure Tablet', taken: true },
      { time: '2:00 PM', name: 'Vitamin D', taken: false },
      { time: '8:00 PM', name: 'Heart Medicine', taken: false }
    ],
    appointment: {
      doctor: 'Dr. Sarah Johnson',
      time: '4:00 PM Today',
      type: 'Regular Checkup'
    },
    vitalHistory: {
      heartRate: [68, 70, 72, 71, 73, 72],
      spo2: [96, 97, 96, 97, 97, 97],
      temperature: [98.1, 98.2, 98.1, 98.2, 98.2, 98.2]
    }
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'status-normal'
      case 'warning': return 'status-warning'
      case 'emergency': return 'status-emergency'
      default: return 'status-normal'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'normal': return 'Normal'
      case 'warning': return 'Needs Attention'
      case 'emergency': return 'Emergency'
      default: return 'Normal'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return (
        <span className="trend-icon trend-up">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </span>
      )
      case 'down': return (
        <span className="trend-icon trend-down">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      )
      default: return (
        <span className="trend-icon trend-stable">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </span>
      )
    }
  }

  const SimpleChart = ({ data, color }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    
    return (
      <div className="simple-chart">
        <div className="chart-bars">
          {data.map((value, index) => (
            <div 
              key={index} 
              className="chart-bar"
              style={{ 
                height: `${((value - min) / range) * 60 + 40}%`,
                backgroundColor: color
              }}
            />
          ))}
        </div>
        <div className="chart-label">Last 6 hours</div>
      </div>
    )
  }

  return (
    <div className="patient-dashboard">
      {/* Emergency Alert Banner */}
      {patientData.healthStatus === 'emergency' && (
        <div className="emergency-banner">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>Emergency detected - Please contact your caregiver immediately</span>
          <button className="emergency-call-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Call Now
          </button>
        </div>
      )}

      {/* Header */}
      <header className="patient-header">
        <div className="header-content">
          <div className="greeting">
            <h1>Hello, {patientData.name}</h1>
            <p>Here is your health summary today</p>
          </div>
          <div className="header-right">
            <div className="last-updated">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Updated {patientData.lastUpdated}
            </div>
            <a href="#" className="back-home-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Home
            </a>
          </div>
        </div>
      </header>

      <main className="patient-main">
        {/* Health Status Summary */}
        <section className="health-status-card">
          <div className={`status-indicator ${getStatusColor(patientData.healthStatus)}`}>
            {patientData.healthStatus === 'normal' && (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            )}
            {patientData.healthStatus === 'warning' && (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
            {patientData.healthStatus === 'emergency' && (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
          </div>
          <div className="status-info">
            <div className="status-label">Your Health Status</div>
            <div className={`status-value ${getStatusColor(patientData.healthStatus)}`}>
              {getStatusText(patientData.healthStatus)}
            </div>
            <div className="health-score">
              <span className="score-label">Health Score:</span>
              <span className="score-value">{patientData.healthScore}/100</span>
            </div>
          </div>
          <div className="status-message">
            {patientData.healthStatus === 'normal' && "Your health looks good today!"}
            {patientData.healthStatus === 'warning' && "Some readings need attention. Please check below."}
            {patientData.healthStatus === 'emergency' && "Please contact your caregiver immediately."}
          </div>
        </section>

        {/* Vitals Overview */}
        <section className="vitals-section">
          <h2 className="section-heading">Your Vitals</h2>
          <div className="vitals-grid">
            {/* Heart Rate */}
            <div className={`vital-card ${getStatusColor(patientData.vitals.heartRate.status)}`}>
              <div className="vital-icon heart">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <div className="vital-content">
                <div className="vital-label">Heart Rate</div>
                <div className="vital-value">
                  <span className="value-number">{patientData.vitals.heartRate.value}</span>
                  <span className="value-unit">{patientData.vitals.heartRate.unit}</span>
                  {getTrendIcon(patientData.vitals.heartRate.trend)}
                </div>
                <div className={`vital-status ${getStatusColor(patientData.vitals.heartRate.status)}`}>
                  {getStatusText(patientData.vitals.heartRate.status)}
                </div>
              </div>
              <SimpleChart data={patientData.vitalHistory.heartRate} color="rgba(239, 68, 68, 0.6)" />
            </div>

            {/* SpO2 */}
            <div className={`vital-card ${getStatusColor(patientData.vitals.spo2.status)}`}>
              <div className="vital-icon oxygen">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22c4-4 8-7.582 8-12a8 8 0 1 0-16 0c0 4.418 4 8 8 12z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="vital-content">
                <div className="vital-label">Oxygen Level</div>
                <div className="vital-value">
                  <span className="value-number">{patientData.vitals.spo2.value}</span>
                  <span className="value-unit">{patientData.vitals.spo2.unit}</span>
                  {getTrendIcon(patientData.vitals.spo2.trend)}
                </div>
                <div className={`vital-status ${getStatusColor(patientData.vitals.spo2.status)}`}>
                  {getStatusText(patientData.vitals.spo2.status)}
                </div>
              </div>
              <SimpleChart data={patientData.vitalHistory.spo2} color="rgba(59, 130, 246, 0.6)" />
            </div>

            {/* Temperature */}
            <div className={`vital-card ${getStatusColor(patientData.vitals.temperature.status)}`}>
              <div className="vital-icon temp">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
                </svg>
              </div>
              <div className="vital-content">
                <div className="vital-label">Temperature</div>
                <div className="vital-value">
                  <span className="value-number">{patientData.vitals.temperature.value}</span>
                  <span className="value-unit">{patientData.vitals.temperature.unit}</span>
                  {getTrendIcon(patientData.vitals.temperature.trend)}
                </div>
                <div className={`vital-status ${getStatusColor(patientData.vitals.temperature.status)}`}>
                  {getStatusText(patientData.vitals.temperature.status)}
                </div>
              </div>
              <SimpleChart data={patientData.vitalHistory.temperature} color="rgba(245, 158, 11, 0.6)" />
            </div>
          </div>
        </section>

        {/* AI Health Assistant */}
        <section className="ai-assistant-card">
          <div className="ai-header">
            <div className="ai-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
                <circle cx="9" cy="13" r="1"></circle>
                <circle cx="15" cy="13" r="1"></circle>
                <path d="M9 17h6"></path>
              </svg>
            </div>
            <h2>AI Health Assistant</h2>
          </div>
          <p className="ai-message">{patientData.aiInsight}</p>
        </section>

        {/* What You Should Do */}
        <section className="actions-section">
          <h2 className="section-heading">What You Should Do</h2>
          <div className="actions-grid">
            <button className="action-card">
              <div className="action-icon water">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <span className="action-text">Drink Water</span>
            </button>
            <button className="action-card">
              <div className="action-icon rest">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </div>
              <span className="action-text">Take Rest</span>
            </button>
            <button className="action-card">
              <div className="action-icon check">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <span className="action-text">Check Vitals Again</span>
            </button>
            <button className="action-card call">
              <div className="action-icon phone">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <span className="action-text">Call Caregiver</span>
            </button>
          </div>
        </section>

        <div className="two-column-section">
          {/* Medication Reminder */}
          <section className="medication-card">
            <h2 className="section-heading">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.5 20.5 3 13l7.5-7.5L18 13l-7.5 7.5z"></path>
                <path d="m6.5 9.5 7.5 7.5"></path>
              </svg>
              Your Medicines Today
            </h2>
            <div className="medication-list">
              {patientData.medications.map((med, index) => (
                <div key={index} className={`medication-item ${med.taken ? 'taken' : 'pending'}`}>
                  <div className="med-time">{med.time}</div>
                  <div className="med-name">{med.name}</div>
                  <div className={`med-status ${med.taken ? 'taken' : 'missed'}`}>
                    {med.taken ? (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Taken
                      </>
                    ) : (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Pending
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Appointment */}
          <section className="appointment-card">
            <h2 className="section-heading">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Next Appointment
            </h2>
            <div className="appointment-content">
              <div className="doctor-avatar">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="appointment-details">
                <div className="doctor-name">{patientData.appointment.doctor}</div>
                <div className="appointment-type">{patientData.appointment.type}</div>
                <div className="appointment-time">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {patientData.appointment.time}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Simple Trend Summary */}
        <section className="trends-card">
          <h2 className="section-heading">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            How You Are Doing
          </h2>
          <div className="trends-list">
            <div className="trend-item good">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Your heart rate has been steady today</span>
            </div>
            <div className="trend-item good">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Your oxygen level is looking great</span>
            </div>
            <div className="trend-item good">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Your temperature is normal</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="patient-footer">
        <p>ElderEase - Your Health Companion</p>
        <div className="footer-buttons">
          <button className="help-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Need Help?
          </button>
          <button className="emergency-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Emergency Call
          </button>
        </div>
      </footer>
    </div>
  )
}

export default PatientDashboard
