import { useEffect, useState } from "react";
import api from "../services/api";
import PatientCard from "../components/dashboard/PatientCard";

export default function CaregiverDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clock, setClock] = useState("");

  const fetchData = async () => {
    try {
      const res = await api.get("/caregiver/dashboard");
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const apiTimer = setInterval(fetchData, 5000);
    return () => clearInterval(apiTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  const isCritical = (vital = {}) => {
  const hr = vital.heartRate || 0;
  const spo2 = vital.spo2 || 0;
  const temp = vital.temp ?? vital.temperature ?? 0;

    return hr < 60 || hr > 100 || spo2 < 95 || temp > 100;
  };

  const critical = patients.filter((p) =>
    isCritical(p.latestVital)
  ).length;

  const stable = patients.length - critical;

  return (
    <div className="container">
      <h1 className="title">Caregiver Dashboard</h1>

      <p className="subtitle">
        Real-time monitoring of all connected elders
      </p>

      {/* SUMMARY */}
      <div className="summary-grid">

        {/* TOTAL */}
        <div className="summary-card">
          <div className="summary-top">
            <b>Total Patients</b>
            <span className="summary-status status-normal">
              NORMAL
            </span>
          </div>

          <div className="summary-value">
            {patients.length}
          </div>

          <div className="summary-footer">
            Updated: Just now
          </div>
        </div>

        {/* CRITICAL */}
        <div className="summary-card">
          <div className="summary-top">
            <b>Critical Patients</b>
            <span className="summary-status status-emergency">
              EMERGENCY
            </span>
          </div>

          <div className="summary-value">
            {critical}
          </div>

          <div className="summary-footer">
            Needs attention
          </div>
        </div>

        {/* STABLE */}
        <div className="summary-card">
          <div className="summary-top">
            <b>Stable Patients</b>
            <span className="summary-status status-normal">
              NORMAL
            </span>
          </div>

          <div className="summary-value">
            {stable}
          </div>

          <div className="summary-footer">
            All good
          </div>
        </div>

        {/* CLOCK */}
        <div className="summary-card">
          <div className="summary-top">
            <b>Live Monitoring</b>
            <span className="summary-status status-warning">
              LIVE
            </span>
          </div>

          <div className="summary-value">
            {clock}
          </div>

          <div className="summary-footer">
            Real-time updates
          </div>
        </div>

      </div>

      <br />

      {/* PATIENT CARDS */}
      <div className="grid">
        {patients.map((item) => (
          <PatientCard key={item.userId} patient={item} />
        ))}
      </div>
    </div>
  );
}