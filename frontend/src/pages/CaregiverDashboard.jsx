import { useState, useEffect } from "react";
import "../styles/dashboard.css";

import PatientCard from "../components/dashboard/PatientCard";

export default function CaregiverDashboard() {

  const [patients, setPatients] = useState([
    { id: 1, name: "Margaret Johnson", heartRate: 120, spo2: 89, temperature: 38.5 },
    { id: 2, name: "Robert Fox", heartRate: 78, spo2: 96, temperature: 36.7 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev =>
        prev.map(p => ({
          ...p,
          heartRate: Math.floor(70 + Math.random() * 60),
          spo2: Math.floor(85 + Math.random() * 12),
          temperature: parseFloat((36 + Math.random() * 2).toFixed(1))
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">

      <h1 className="dashboard-title">Caregiver Dashboard</h1>

      <div className="patient-grid">
        {patients.map(p => (
          <PatientCard key={p.id} patient={p} />
        ))}
      </div>

    </div>
  );
}