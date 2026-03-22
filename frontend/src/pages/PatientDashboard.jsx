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

import FavoriteIcon from "@mui/icons-material/Favorite";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

export default function PatientDashboard() {
  const [data, setData] = useState({
    heartRate: 82,
    spo2: 95,
    temperature: 36.8
  });
  
  useEffect(() => {
  const saved = localStorage.getItem("selectedPatient");

  if (saved) {
    const patient = JSON.parse(saved);

    setData({
      heartRate: patient.heartRate,
      spo2: patient.spo2,
      temperature: patient.temperature
    });

    localStorage.removeItem("selectedPatient"); // ✅ move here
  }
}, []);

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

      setData(prev => ({
        ...prev,
        ...newData
      }));
      setHistory(prev => [...prev.slice(-9), newData]);

    }, 3000);

    localStorage.removeItem("selectedPatient");

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

  const lastUpdated = new Date().toLocaleTimeString();

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

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px"
  };

   const getIcon = (msg) => {
      if (msg.includes("🚨")) return <ErrorIcon style={{ color: "#ef4444", fontSize: "22px" }} />;
      if (msg.includes("⚠")) return <WarningIcon style={{ color: "#f59e0b", fontSize: "22px" }} />;
      if (msg.includes("📈")) return <TrendingUpIcon style={{ color: "#3b82f6", fontSize: "22px" }} />;
      if (msg.includes("📉")) return <TrendingDownIcon style={{ color: "#3b82f6", fontSize: "22px" }} />;
      if (msg.includes("📩")) return <NotificationsActiveIcon style={{ color: "#8b5cf6", fontSize: "22px" }} />;
      return <CheckCircleIcon style={{ color: "#10b981", fontSize: "22px" }} />;
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize(); // 👈 add this
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    const selected = JSON.parse(localStorage.getItem("selectedPatient") || "null");

  return (
    <div style={{
      padding: isMobile ? "20px" : "30px",
      background: "#f3f4f6",
      minHeight: "100vh"
    }}>
      
      {/* 🔷 NAVBAR */}
      <div style={{
        background: "white",
        padding: isMobile ? "12px 16px" : "15px 30px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "10px" : "0",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
      }}>

        <h2 style={{ fontWeight: "700" }}>ElderEase</h2>
        
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          width: isMobile ? "100%" : "auto",
          justifyContent: isMobile ? "space-between" : "flex-end"
        }}>

        {/* 👤 Patient Info */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: "600" }}>

            {selected?.name || localStorage.getItem("userName") || "Margaret Johnson"}
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Patient
          </div>
        </div>

        {/* 🚪 Logout ICON button */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "none",
            background: "#e5e7eb",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <LogoutIcon style={{ fontSize: "20px", color: "#374151" }} />
        </button>

      </div>

      </div>

      <div style={{ padding: "20px" }}>

        {showSettings && (
  <div style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
  }}>
    <div style={{
      ...card,
      width: isMobile ? "100%" : "70%",
      padding: isMobile ? "16px" : "24px",
      maxWidth: "900px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
    }}>

      {/* 🔝 HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: 0 }}>Personalized Thresholds</h3>

        <span
          onClick={() => setShowSettings(false)}
          style={{ cursor: "pointer", fontSize: "18px" }}
        >
          ✕
        </span>
      </div>

      {/* 📊 INPUT GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
        gap: "20px"
      }}>

        {/* ❤️ Heart Rate */}
        <div>
          <label>Heart Rate Max</label>
          <input
            type="number"
            value={thresholds.heartRate}
            onChange={(e) =>
              setThresholds({ ...thresholds, heartRate: Number(e.target.value) })
            }
            style={inputStyle}
          />
        </div>

        {/* 🔵 SpO2 */}
        <div>
          <label>SpO2 Min (%)</label>
          <input
            type="number"
            value={thresholds.spo2}
            onChange={(e) =>
              setThresholds({ ...thresholds, spo2: Number(e.target.value) })
            }
            style={inputStyle}
          />
        </div>

        {/* 🌡 Temperature */}
        <div>
          <label>Temperature Max (°C)</label>
          <input
            type="number"
            value={thresholds.temperature}
            onChange={(e) =>
              setThresholds({ ...thresholds, temperature: Number(e.target.value) })
            }
            style={inputStyle}
          />
        </div>

      </div>

      {/* 🔘 BUTTONS */}
      <div style={{
        marginTop: "20px",
        display: "flex",
        gap: "12px"
      }}>

        {/*  SAVE */}
        <button 
          onClick={() => {
            setShowSettings(false);
            alert("Thresholds saved!");
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "#059669"}
          onMouseOut={(e) => e.currentTarget.style.background = "#10b981"}
          style={{
            padding: "10px 16px",
            borderRadius: "10px",
            border: "none",
            background: "#10b981",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}>
            <SaveIcon style={{ fontSize: "18px" }} />
            Save
        </button>

        {/* 🔄 RESET */}
        <button
          onClick={() =>
            setThresholds({
              heartRate: 110,
              spo2: 92,
              temperature: 38
            })
          }
          style={{
            padding: "10px 16px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
            cursor: "pointer"
          }}
        >
          Reset Defaults
        </button>

      </div>

    </div>
  </div>
)}

        {/* 🚨 ALERT */}
        <AlertBanner status={status} />

        <div style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "12px" : "0",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center"
        }}>

        {/* LEFT */}
        <div>
          <h1 style={{
            fontSize: isMobile ? "24px" : "28px",
            fontWeight: "700",
            margin: 0
          }}>
            My Health Dashboard
          </h1>

          <p style={{
            color: "#6b7280",
            marginTop: "4px",
            fontSize: "14px"
          }}>
            Real-time health monitoring
          </p>

          {/* 🔽 below line */}
          <div style={{
            marginTop: "6px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "13px",
            color: "#6b7280"
          }}>
            <span>
              Last Updated: <strong style={{ color: "#111827" }}>{lastUpdated}</strong>
            </span>

            <span style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
              padding: "4px 10px",
              borderRadius: "999px",
              background: "#dcfce7",
              color: "#065f46",
              fontWeight: "500"
            }}>
              ● Live Monitoring
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "100%" : "auto",
          gap: isMobile ? "14px" : "12px",
          alignItems: isMobile ? "stretch" : "center"
        }}>

          {/* ⚙ BUTTON */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              border: "none",
              background: "#e5e7eb",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              fontWeight: "500"
            }}
          >
            ⚙ Custom Thresholds
          </button>

          {/* 🚨 SIMULATE EMERGENCY */}
          <button
            onMouseOver={(e) => e.currentTarget.style.background = "#dc2626"}
            onMouseOut={(e) => e.currentTarget.style.background = "#ef4444"}
            onClick={() =>
              setData({ heartRate: 140, spo2: 85, temperature: 39 })
            }
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              border: "none",
              background: "#ef4444",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              gap: "6px"
            }}
          >
            <CrisisAlertIcon style={{ fontSize: "18px" }} />
            Simulate
          </button>

          {/* 🟢 STATUS */}
          <div style={{
            padding: "10px 20px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "700",
            width: isMobile ? "100%" : "auto",
            textAlign: "center",
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
          </div>

        </div>

      </div>

        {/* 📊 HEALTH SUMMARY */}
        <div style={{
          ...card,
          marginTop: "20px",
          padding: isMobile ? "14px" : "18px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: "20px"
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

            <p style={{ margin: "6px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingUpIcon style={{ fontSize: "18px", color: "#3b82f6" }} />
            Health Score:
            <span style={{ color: "#ef4444", fontWeight: "600" }}>
              {100 - riskScore * 5}/100
            </span>
          </p>

          <p style={{ margin: "6px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <WarningIcon style={{ fontSize: "18px", color: "#f59e0b" }} />
            Warnings detected:
            <span style={{ fontWeight: "600" }}>
              {riskLevel === "MEDIUM" ? 1 : 0}
            </span>
          </p>

          <p style={{ margin: "6px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <ErrorIcon style={{ fontSize: "18px", color: "#ef4444" }} />
            Emergencies:
            <span style={{ fontWeight: "600" }}>
              {riskLevel === "HIGH" ? 1 : 0}
            </span>
          </p>
          </div>

        </div>

{/* ❤️ VITALS */}
<div style={{
  display: "grid",
  gridTemplateColumns: isMobile
    ? "1fr"
    : "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
  marginTop: "20px"
}}>

  {/* ❤️ Heart Rate */}
  <VitalCard
    title="Heart Rate"
    value={heartRate}
    unit="bpm"
    icon={
      <FavoriteIcon
        style={{
          fontSize: "28px",
          color: heartRate > thresholds.heartRate ? "#ef4444" : "#10b981"
        }}
      />
    }
    style={{
      border:
        heartRate > thresholds.heartRate
          ? "2px solid #ef4444"
          : "1px solid #e5e7eb",
      background:
        heartRate > thresholds.heartRate ? "#fef2f2" : "#f9fafb"
    }}
  />

  {/* 🔵 SpO2 */}
  <VitalCard
    title="SpO2"
    value={spo2}
    unit="%"
    icon={
      <OpacityIcon
        style={{
          fontSize: "28px",
          color: spo2 < thresholds.spo2 ? "#f59e0b" : "#10b981"
        }}
      />
    }
    style={{
      border:
        spo2 < thresholds.spo2
          ? "2px solid #f59e0b"
          : "1px solid #e5e7eb",
      background:
        spo2 < thresholds.spo2 ? "#fff7ed" : "#f9fafb"
    }}
  />

  {/* 🌡 Temperature */}
  <VitalCard
    title="Temperature"
    value={temperature}
    unit="°C"
    icon={
      <ThermostatIcon
        style={{
          fontSize: "28px",
          color:
            temperature > thresholds.temperature ? "#ef4444" : "#10b981"
        }}
      />
    }
    style={{
      border:
        temperature > thresholds.temperature
          ? "2px solid #ef4444"
          : "1px solid #e5e7eb",
      background:
        temperature > thresholds.temperature ? "#fef2f2" : "#f9fafb"
    }}
  />

</div>

        {/* 📈 CHART SECTION */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>

          {/* ❤️ HEART RATE */}
          <div style={{ ...card, padding: "14px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
              padding: isMobile ? "14px" : "18px",
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
              marginBottom: "12px",
              padding: isMobile ? "14px" : "18px",
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
              marginBottom: "12px",
              padding: isMobile ? "14px" : "18px",
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
            <h3 style={{ marginBottom: "10px" }}>Insights</h3>

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
                  {getIcon(msg)}

                  <span style={{ fontWeight: "500" }}>
                    {msg
                      .replace("🚨", "")
                      .replace("⚠", "")
                      .replace("📉", "")
                      .replace("📈", "")
                      .replace("📩", "")
                      .replace("✅", "")
                    }
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