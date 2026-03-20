import { useEffect, useState, useRef } from "react";
import VitalCard from "../components/VitalCard";
import StatusBadge from "../components/StatusBadge";
import RiskScore from "../components/RiskScore";
import AlertBanner from "../components/AlertBanner";
import HeartRateChart from "../components/HeartRateChart";
import { predictRisk, generateInsights, getRiskLevel } from "../utils/aiModel";
import {
  LineChart, Line,
  XAxis, YAxis,
  Tooltip
} from "recharts";

export default function PatientDashboard() {
  const [data, setData] = useState({
    heartRate: 82,
    spo2: 95,
    temperature: 36.8
  });

  const [history, setHistory] = useState([]);

  const [showSettings, setShowSettings] = useState(false);

  // 🔥 LIVE SIMULATION
  const hours = ["00:00","04:00","08:00","12:00","16:00","20:00"];
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {

      const newData = {
        time: hours[indexRef.current],
        heartRate: Math.floor(70 + Math.random() * 50),
        spo2: Math.floor(88 + Math.random() * 10),
        temperature: parseFloat((36 + Math.random() * 2).toFixed(1))
      };

      indexRef.current = (indexRef.current + 1) % hours.length;

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
    padding: "16px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
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
        
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
  onClick={() => setShowSettings(!showSettings)}
  style={{
            padding: "6px 12px",
            borderRadius: "8px",
            border: "none",
            background: "#e5e7eb",
            cursor: "pointer"
          }}
        >
          ⚙ Custom Thresholds
        </button>

          <span style={{
            background: "#f59e0b",
            padding: "4px 10px",
            borderRadius: "10px",
            fontSize: "12px"
          }}>
            Warning
          </span>
        </div>

      </div>

      <div style={{ padding: "20px" }}>

      {showSettings && (
        <div style={{
          ...card,
          marginTop: "20px",
          marginBottom: "10px"
        }}>
          <h3>Custom Thresholds</h3>

          <p>Heart Rate Max: 110 bpm</p>
          <p>SpO2 Min: 92%</p>
          <p>Temperature Max: 38°C</p>
        </div>
      )}
      
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
        gap: "16px",
        marginTop: "20px"
      }}>

        <div style={{ ...card, padding: "12px" }}>
          <h4>Health Score</h4>
          <h2 style={{ marginTop: "8px" }}>{100 - riskScore * 5}</h2>
        </div>

        <div style={{ ...card, padding: "12px" }}>
          <h4>Risk Score</h4>
          <h2 style={{ marginTop: "8px" }}>{riskScore}/10</h2>
        </div>

        <div style={{ ...card, padding: "12px" }}>
          <h4>Status</h4>
          <h2 style={{ marginTop: "8px" }}>{status}</h2>
        </div>

        <div style={{ ...card, padding: "12px" }}>
          <h4>Alerts</h4>
          <h2 style={{ marginTop: "8px" }}>
            {riskLevel === "HIGH" ? 1 : 0}
          </h2>
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
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>

          {/* ❤️ HEART RATE */}
          <div style={{ ...card, padding: "16px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
                Heart Rate
              </h3>

              <div style={{ display: "flex", gap: "10px" }}>
                <span style={{
                  background: "#10b981",
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "12px"
                }}>
                  24 Hours
                </span>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>Weekly</span>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>Monthly</span>
              </div>
            </div>

            <HeartRateChart data={history} dataKey="heartRate" color="#ef4444" />
          </div>

          {/* 🔵 SpO2 */}
          <div style={{ ...card, padding: "16px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
                SpO2
              </h3>

              <div style={{ display: "flex", gap: "10px" }}>
                <span style={{
                  background: "#10b981",
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "12px"
                }}>
                  24 Hours
                </span>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>Weekly</span>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>Monthly</span>
              </div>
            </div>

            <HeartRateChart data={history} dataKey="spo2" color="#3b82f6" />
          </div>

          {/* 🟡 TEMPERATURE */}
          <div style={{ ...card, padding: "16px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
                Temperature
              </h3>

              <div style={{ display: "flex", gap: "10px" }}>
                <span style={{
                  background: "#10b981",
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "12px"
                }}>
                  24 Hours
                </span>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>Weekly</span>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>Monthly</span>
              </div>
            </div>

            <HeartRateChart data={history} dataKey="temperature" color="#f59e0b" />
          </div>

        </div>

        {/* 🧠 BOTTOM SECTION */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "20px"
        }}>

          {/* 📋 RECENT ACTIVITY */}
          <div style={card}>
            <h3>Recent Activity</h3>

            <p>Heart rate fluctuating</p>
            <p>SpO2 slightly low</p>
            <p>Temperature stable</p>
          </div>

          {/* 💡 AI INSIGHTS */}
          <div style={card}>
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
    </div>     
  );
}