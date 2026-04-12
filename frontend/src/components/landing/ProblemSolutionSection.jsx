import "../../styles/problemsolution.css";
import { AlertTriangle, Eye, Clock, Activity, Bell, LayoutDashboard } from "lucide-react";

export default function ProblemSolutionSection() {

  return (
    <section className="ps-section">

      <div className="ps-container">

        {/* HEADER */}
        <div className="ps-header">
          <span className="ps-tag">Why ElderEase?</span>

          <h2 className="ps-title">
            The Challenge & Our Solution
          </h2>

          <p className="ps-desc">
            Traditional care methods leave gaps. We fill them with technology.
          </p>
        </div>

        {/* GRID */}
        <div className="ps-grid">

          {/* PROBLEM */}
          <div className="ps-card">

            <div className="ps-card-header">
              <div className="ps-icon-box" style={{ background: "#fee2e2" }}>
                <AlertTriangle color="#dc2626" />
              </div>

              <h3 style={{ color: "#dc2626" }}>The Problem</h3>
            </div>

            <div className="ps-list">

              <div className="ps-item">
                <div className="ps-item-icon" style={{ background: "#fee2e2" }}>
                  <Clock color="#f87171" />
                </div>
                <div>
                  <div className="ps-item-title">Elderly Alone</div>
                  <div className="ps-item-text">
                    Seniors live alone without immediate help
                  </div>
                </div>
              </div>

              <div className="ps-item">
                <div className="ps-item-icon" style={{ background: "#fee2e2" }}>
                  <Bell color="#f87171" />
                </div>
                <div>
                  <div className="ps-item-title">No Quick Response</div>
                  <div className="ps-item-text">
                    Emergencies go unnoticed
                  </div>
                </div>
              </div>

              <div className="ps-item">
                <div className="ps-item-icon" style={{ background: "#fee2e2" }}>
                  <Eye color="#f87171" />
                </div>
                <div>
                  <div className="ps-item-title">No Visibility</div>
                  <div className="ps-item-text">
                    Caregivers lack real-time monitoring
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SOLUTION */}
          <div className="ps-card">

            <div className="ps-card-header">
              <div className="ps-icon-box" style={{ background: "#dcfce7" }}>
                <Activity color="#16a34a" />
              </div>

              <h3 style={{ color: "#16a34a" }}>Our Solution</h3>
            </div>

            <div className="ps-list">

              <div className="ps-item">
                <div className="ps-item-icon" style={{ background: "#dcfce7" }}>
                  <Activity color="#16a34a" />
                </div>
                <div>
                  <div className="ps-item-title">Real-time Monitoring</div>
                  <div className="ps-item-text">
                    24/7 health tracking
                  </div>
                </div>
              </div>

              <div className="ps-item">
                <div className="ps-item-icon" style={{ background: "#dcfce7" }}>
                  <Bell color="#16a34a" />
                </div>
                <div>
                  <div className="ps-item-title">Smart Alerts</div>
                  <div className="ps-item-text">
                    AI-powered notifications
                  </div>
                </div>
              </div>

              <div className="ps-item">
                <div className="ps-item-icon" style={{ background: "#dcfce7" }}>
                  <LayoutDashboard color="#16a34a" />
                </div>
                <div>
                  <div className="ps-item-title">Caregiver Dashboard</div>
                  <div className="ps-item-text">
                    Monitor all patients in one place
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}