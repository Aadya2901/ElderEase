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
        <h2 style={{ fontWeight: "700" }}>ElderEase</h2>
        <p style={{ color: "gray" }}>Patient Dashboard</p>
      </div>

      <div style={{ padding: "20px" }}>

        {/* 🚨 ALERT */}
        <AlertBanner status={status} />

        {/* 🏥 TITLE */}
        <h1 style={{
          marginTop: "20px",
          fontSize: "28px",
          fontWeight: "700"
        }}>
          My Health Dashboard
        </h1>

        {/* 📊 HEALTH SUMMARY */}
        {/* 📊 KPI CARDS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}>

          <div style={card}>
            <h4>Health Score</h4>
            <h2>{100 - riskScore * 5}</h2>
          </div>

          <div style={card}>
            <h4>Risk Score</h4>
            <h2>{riskScore}/10</h2>
          </div>

          <div style={card}>
            <h4>Status</h4>
            <h2>{status}</h2>
          </div>

          <div style={card}>
            <h4>Alerts</h4>
            <h2>{riskLevel === "HIGH" ? 1 : 0}</h2>
          </div>

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

        {/* ❤️ VITALS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}>
          
          <VitalCard title="Heart Rate" value={heartRate} unit="bpm" />
          <VitalCard title="SpO2" value={spo2} unit="%" />
          <VitalCard title="Temperature" value={temperature} unit="°C" />
        </div>

        {/* 📈 CHART SECTION */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "20px"
        }}>

          {/* 🔥 BIG MAIN CHART */}
          <div style={card}>
            <h3>Heart Rate Trend</h3>
            <HeartRateChart data={history} />
          </div>

          {/* 🔥 SECONDARY CHART */}
          <div style={card}>
            <h3>SpO2 Trend</h3>
            <HeartRateChart data={history} />
          </div>

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
    </div>     
  );
}