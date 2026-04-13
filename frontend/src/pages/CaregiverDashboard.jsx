import { useState, useEffect } from "react";
import "../styles/dashboard.css";

export default function CaregiverDashboard() {

  const [patients, setPatients] = useState([
    { id: 1, name: "Margaret Johnson", heartRate: 95, spo2: 94, temperature: 37 },
    { id: 2, name: "Robert Fox", heartRate: 78, spo2: 96, temperature: 36.7 }
  ]);

  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // 🔁 REAL-TIME SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev =>
        prev.map(p => {
          const heartRate = Math.floor(60 + Math.random() * 50);
          const spo2 = Math.floor(88 + Math.random() * 10);
          const temperature = parseFloat((36 + Math.random()).toFixed(1));

          // 🔔 Notifications
          if (spo2 < 90) {
            setNotifications(prev => [
              {
                msg: `${p.name} low SpO₂`,
                time: new Date().toLocaleTimeString()
              },
              ...prev
            ]);
          }

          return { ...p, heartRate, spo2, temperature };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* 🔷 TOPBAR */}
      <div className="topbar">
        <h1>ElderEase</h1>
        <div>🔔 👤</div>
      </div>

      {/* 🚨 ALERTS */}
      <div className="alerts-section">
        <h2>🚨 Critical Alerts</h2>

        {patients
          .filter(p => p.spo2 < 90 || p.heartRate > 110)
          .map(p => (
            <div className="alert-card" key={p.id}>
              <h3>{p.name} 🔴 EMERGENCY</h3>
              <p>SpO₂: {p.spo2} | HR: {p.heartRate}</p>

              <div className="actions">
                <button>📞 Call</button>
                <button onClick={() => setSelectedPatient(p)}>📊 View</button>
                <button>🏥 Hospital</button>
              </div>
            </div>
          ))}
      </div>

      {/* 👨‍👩‍👧 PATIENTS */}
      <div className="patients-section">

        <div className="header">
          <h2>Patients</h2>
          <input
            placeholder="Search patient..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="patient-grid">
          {filteredPatients.map(p => {
            const status =
              p.spo2 < 90 || p.heartRate > 110
                ? "🔴 High"
                : p.spo2 < 94
                ? "🟡 Warning"
                : "🟢 Stable";

            return (
              <div
                className="patient-card"
                onClick={() => setSelectedPatient(p)}
                key={p.id}
              >
                <h3>{p.name}</h3>
                <p>{status}</p>
                <p>HR: {p.heartRate}</p>
              </div>
            );
          })}
        </div>

      </div>

      {/* 🧠 PATIENT DETAIL PANEL */}
      {selectedPatient && (
        <div className="patient-detail">

          <h2>{selectedPatient.name}</h2>

          <div className="vitals">
            <p>❤️ HR: {selectedPatient.heartRate}</p>
            <p>🫁 SpO₂: {selectedPatient.spo2}</p>
            <p>🌡 Temp: {selectedPatient.temperature}</p>
          </div>

          <div className="status">
            Status: {selectedPatient.spo2 < 90 ? "🔴 EMERGENCY" : "🟢 STABLE"}
          </div>

          <div className="ai-box">
            <h3>🧠 AI Insight</h3>
            <p>
              {selectedPatient.spo2 < 90
                ? "Low oxygen detected. Possible respiratory issue."
                : "Vitals are stable."}
            </p>
          </div>

          <div className="actions">
            <h3>⚡ Recommended Actions</h3>
            <ul>
              <li>Call patient</li>
              <li>Recheck vitals</li>
              <li>Ensure hydration</li>
            </ul>
          </div>

        </div>
      )}

      {/* 🔔 NOTIFICATIONS */}
      <div className="notification-panel">
        {notifications.slice(0, 5).map((n, i) => (
          <p key={i}>{n.time} - {n.msg}</p>
        ))}
      </div>

    </div>
  );
}