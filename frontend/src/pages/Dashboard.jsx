import { useEffect, useState } from "react";
import api from "../services/api";
import PatientCard from "../components/PatientCard";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
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
    return (
      <div className="container">
        Loading...
      </div>
    );
  }

  // const critical = patients.filter(
  //   (p) => p.activeAlerts > 0
  // ).length;

  // const stable = patients.length - critical;
  const critical = patients.filter((p) => {
  const vital = p.latestVital || {};

  const hr = vital.heartRate || 0;
  const spo2 = vital.spo2 || 0;
  const temp = vital.temp ?? vital.temperature ?? 0;

  return (
    hr < 60 ||
    hr > 100 ||
    spo2 < 95 ||
    temp > 100
  );
}).length;

const stable = patients.filter((p) => {
  const vital = p.latestVital || {};

  const hr = vital.heartRate || 0;
  const spo2 = vital.spo2 || 0;
  const temp = vital.temp ?? vital.temperature ?? 0;

  return !(
    hr < 60 ||
    hr > 100 ||
    spo2 < 95 ||
    temp > 100
  );
}).length;

  return (
    <div className="container">
      <h1 className="title">
        Caregiver Dashboard
      </h1>

      <p className="subtitle">
        Real-time monitoring of all connected elders
      </p>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">
        <div className="summary-card blue">
          Total Patients
          <div className="summary-value">
            {patients.length}
          </div>
        </div>

        <div className="summary-card red">
          Critical Patients
          <div className="summary-value">
            {critical}
          </div>
        </div>

        <div className="summary-card green">
          Stable Patients
          <div className="summary-value">
            {stable}
          </div>
        </div>

        <div className="summary-card purple">
          Live Monitoring
          <div className="summary-value">
            {clock}
          </div>
        </div>
      </div>

      <br />

      {/* PIE CHART */}
      {/* <div className="card">
        <h3>
          Patient Health Distribution
        </h3>

        <p>
          Stable vs Critical monitored elders
        </p>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={[
                {
                  name: "Stable",
                  value: stable
                },
                {
                  name: "Critical",
                  value: critical
                }
              ]}
              dataKey="value"
              outerRadius={100}
              label
            >
              <Cell fill="#10b981" />
              <Cell fill="#ef4444" />
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div> */}

      <br />

      {/* PATIENT CARDS */}
      <div className="grid">
        {patients.map((item) => (
          <PatientCard
            key={item.userId}
            patient={item}
          />
        ))}
      </div>
    </div>
  );
}