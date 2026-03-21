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

  const [thresholds, setThresholds] = useState({
    heartRate: 110,
    spo2: 92,
    temperature: 38
  });

  const [history, setHistory] = useState([]);

  const [showSettings, setShowSettings] = useState(false);

  // 🔥 LIVE SIMULATION
  const hours = ["00:00","04:00","08:00","12:00","16:00","20:00"];
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {

      const newData = {
        time: hours[indexRef.current], // ✅ stable labels
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
  const riskScore = predictRisk(
    heartRate,
    spo2,
    temperature,
    thresholds
  );

  const riskLevel = getRiskLevel(riskScore);

  const insights = generateInsights(
    heartRate, 
    spo2, 
    temperature, 
    history,
    thresholds,
    riskScore
  );
  
  const status =
    riskLevel === "HIGH"
      ? "EMERGENCY"
      : riskLevel === "MEDIUM"
      ? "WARNING"
      : "NORMAL";

  const card = {
    background: "#f9fafb",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "all 0.2s ease",
    cursor: "pointer"
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

          {/* ❤️ Heart Rate */}
          <div style={{ marginTop: "10px" }}>
            <label>Heart Rate Max</label>
            <input
              type="number"
              min={60}
              max={200}
              value={thresholds.heartRate}
              onChange={(e) =>
                setThresholds({ ...thresholds, heartRate: Number(e.target.value) })
              }
              style={{
                width: "100%",
                padding: "6px",
                marginTop: "4px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb"
              }}
            />
          </div>

          {/* 🔵 SpO2 */}
          <div style={{ marginTop: "10px" }}>
            <label>SpO2 Min</label>
            <input
              type="number"
              min={80}
              max={100}
              value={thresholds.spo2}
              onChange={(e) =>
                setThresholds({ ...thresholds, spo2: Number(e.target.value) })
              }
              style={{
                width: "100%",
                padding: "6px",
                marginTop: "4px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb"
              }}
            />
          </div>

          {/* 🟡 Temperature */}
          <div style={{ marginTop: "10px" }}>
            <label>Temperature Max</label>
            <input
              type="number"
              min={34}
              max={42}
              value={thresholds.temperature}
              onChange={(e) =>
                setThresholds({ ...thresholds, temperature: Number(e.target.value) })
              }
              style={{
                width: "100%",
                padding: "6px",
                marginTop: "4px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb"
              }}
            />
          </div>

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

        {/* PATIENT STATUS */}
        <h2 style={{
          fontSize: "20px",
          fontWeight: "600",
          marginTop: "8px",
          color: "#374151"
        }}>
          Patient Status:
          <span style={{
            marginLeft: "8px",
            padding: "4px 10px",
            borderRadius: "999px",
            background:
              status === "EMERGENCY" ? "#fee2e2" :
              status === "WARNING" ? "#fef3c7" :
              "#dcfce7",
            color:
              status === "EMERGENCY" ? "#991b1b" :
              status === "WARNING" ? "#92400e" :
              "#065f46"
          }}>
            {status}
          </span>
        </h2>

        {/* 📊 HEALTH SUMMARY */}
        <div style={{
          ...card,
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "30px"
        }}>

          {/* 🔴 CIRCLE SCORE */}
          <div style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: `6px solid ${
              (100 - riskScore * 5) < 50 ? "#ef4444" :
              (100 - riskScore * 5) < 75 ? "#f59e0b" :
              "#10b981"
            }`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700"
          }}>
            <span style={{ fontSize: "28px" }}>
              {100 - riskScore * 5}
            </span>
            <span style={{ fontSize: "12px", color: "#6b7280" }}>
              /100
            </span>
          </div>

          {/* 📊 TEXT SECTION */}
          <div>
            <h3 style={{ marginBottom: "10px" }}>
              Daily Health Summary
            </h3>

            <p style={{ margin: "6px 0" }}>
              📈 Health Score:{" "}
              <span style={{ color: "#ef4444", fontWeight: "600" }}>
                {100 - riskScore * 5}/100
              </span>
            </p>

            <p style={{ margin: "6px 0" }}>
              ⚠ Warnings detected:{" "}
              <span style={{ fontWeight: "600" }}>
                {riskLevel === "MEDIUM" ? 1 : 0}
              </span>
            </p>

            <p style={{ margin: "6px 0" }}>
              🚨 Emergencies:{" "}
              <span style={{ fontWeight: "600" }}>
                {riskLevel === "HIGH" ? 1 : 0}
              </span>
            </p>
          </div>

        </div>

       {/* 📊 KPI CARDS */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginTop: "20px"
          }}>

        <div
          style={{ ...card, padding: "12px" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
        >
          <h4>Health Score</h4>
          <h2 style={{ marginTop: "8px" }}>{100 - riskScore * 5}</h2>
        </div>

        <div
          style={{ ...card, padding: "12px" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
        >
          <h4>Risk Score</h4>
          <h2 style={{ marginTop: "8px" }}>{riskScore}/10</h2>
        </div>

        <div style={{
          ...card,
          padding: "12px",
          border:
            status === "EMERGENCY" ? "2px solid #ef4444" :
            status === "WARNING" ? "2px solid #f59e0b" :
            "2px solid #10b981"
        }}>
          <h4>Status</h4>
          <h2 style={{ marginTop: "8px" }}>{status}</h2>
        </div>

        <div
          style={{ ...card, padding: "12px" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
        >
          <h4>Alerts</h4>
          <h2 style={{ marginTop: "8px" }}>
            {riskLevel === "HIGH" ? 1 : 0}
          </h2>
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
          <div style={{ ...card, padding: "14px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px"
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
          <div style={{ ...card, padding: "14px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px"
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
          <div style={{ ...card, padding: "14px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px"
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
          gridTemplateColumns: "1fr",
          gap: "20px",
          marginTop: "20px"
        }}>

          {/* 💡 AI INSIGHTS */}
          <div style={card}>
            <h3 style={{ marginBottom: "10px" }}>AI Insights</h3>

            {insights.map((msg, i) => {
              const isDanger = msg.includes("🚨");
              const isWarning = msg.includes("⚠");

              return (
                <div
                  key={i}
                  style={{
                    marginTop: "10px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",

                    background:
                      isDanger ? "#fff1f2" :
                      isWarning ? "#fffbeb" :
                      "#f0fdf4",

                    color:
                      isDanger ? "#991b1b" :
                      isWarning ? "#92400e" :
                      "#065f46",

                    border:
                      isDanger
                        ? "1px solid #fecaca"
                        : isWarning
                        ? "1px solid #fde68a"
                        : "1px solid #a7f3d0",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>
                    {isDanger ? "🚨" : isWarning ? "⚠" : "✅"}
                  </span>

                  <span style={{ fontWeight: "500" }}>
                    {msg.replace(/[🚨⚠📉📈✅]/g, "")}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>   
    </div>     
  );
}