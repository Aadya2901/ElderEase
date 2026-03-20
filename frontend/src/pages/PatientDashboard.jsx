import { useEffect, useState } from "react";
import VitalCard from "../components/VitalCard";
import StatusBadge from "../components/StatusBadge";
import RiskScore from "../components/RiskScore";
import AlertBanner from "../components/AlertBanner";
import HeartRateChart from "../components/HeartRateChart";

import { predictRisk, generateInsights, getRiskLevel } from "../utils/aiModel";

export default function PatientDashboard() {
  const [data, setData] = useState({
    heartRate: 82,
    spo2: 95,
    temperature: 36.8
  });

  const [history, setHistory] = useState([]);

  // 🔥 LIVE SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        heartRate: Math.floor(70 + Math.random() * 50),
        spo2: Math.floor(88 + Math.random() * 10),
        temperature: (36 + Math.random() * 2).toFixed(1)
      };

      setData(newData);
      setHistory(prev => [...prev.slice(-9), newData]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const { heartRate, spo2, temperature } = data;

  // 🧠 AI LOGIC
  const riskScore = predictRisk(heartRate, spo2, temperature);
  const riskLevel = getRiskLevel(riskScore);
  const insights = generateInsights(heartRate, spo2, temperature);

  const status =
    riskLevel === "HIGH"
      ? "EMERGENCY"
      : riskLevel === "MEDIUM"
      ? "WARNING"
      : "NORMAL";

  const card = {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
};

  return (
    <div style={{ 
      padding: "30px",
      background: "#f3f4f6",
      minHeight: "100vh"
    }}>
      
      {/* 🔷 NAVBAR */}
      <div style={{
        background: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
      }}>
        <h2>ElderEase</h2>
        <p>Patient Dashboard</p>
      </div>

      <div style={{ padding: "20px" }}>

        {/* 🚨 ALERT */}
        <AlertBanner status={status} />

        {/* 🏥 TITLE */}
        <h1 style={{ marginTop: "20px" }}>My Health Dashboard</h1>

        {/* 📊 HEALTH SUMMARY */}
        <div style={{ ...card, marginTop: "20px" }}>

          <h3>Daily Health Summary</h3>
          <p>Health Score: {100 - riskScore * 5}/100</p>
          <p>Warnings: {riskLevel === "MEDIUM" ? 1 : 0}</p>
          <p>Emergencies: {riskLevel === "HIGH" ? 1 : 0}</p>
        </div>

        {/* 🧠 STATUS + AI */}
        <div style={{
          ...card,
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <StatusBadge status={status} />
            <RiskScore score={riskScore} />
          </div>

          <div style={{ textAlign: "right" }}>
            <p style={{ fontWeight: "600" }}>AI Risk</p>
            <p>{riskLevel}</p>
            <p style={{ fontSize: "12px", color: "gray" }}>
              {riskScore * 10}% probability
            </p>
          </div>
        </div>

        </div>

        {/* ❤️ VITALS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
        }}>
          <VitalCard title="Heart Rate" value={heartRate} unit="bpm" />
          <VitalCard title="SpO2" value={spo2} unit="%" />
          <VitalCard title="Temperature" value={temperature} unit="°C" />
        </div>

        {/* 📈 CHART */}
        <div style={{ ...card, marginTop: "20px" }}>
          <h3>Heart Rate Trend</h3>
          <HeartRateChart data={history} />
        </div>

        {/* 💡 INSIGHTS */}
        <div style={{ ...card, marginTop: "20px" }}>
          <h3>AI Insights</h3>

          {insights.map((msg, i) => (
            <div key={i} style={{
              marginTop: "10px",
              padding: "12px",
              borderRadius: "10px",
              background:
                msg.includes("⚠") ? "#fef3c7" :
                msg.includes("🚨") ? "#fee2e2" :
                "#dcfce7"
            }}>
              {msg}
            </div>
          ))}
      </div>
    </div>
  );
}