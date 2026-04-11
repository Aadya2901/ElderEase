import { useEffect, useState, useRef } from "react";
import VitalCard from "../components/dashboard/VitalCard";
import StatusBadge from "../components/StatusBadge";
import RiskScore from "../components/RiskScore";
import AlertBanner from "../components/dashboard/AlertBanner";
import HeartRateChart from "../components/dashboard/HeartRateChart";
import AIInsightsCard from "../components/dashboard/AIInsightsCard";
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

import { colors } from "../styles/colors";

export default function PatientDashboard() {
  const [data, setData] = useState({
    heartRate: 82,
    spo2: 95,
    temperature: 36.8
  });

  const [selectedPatient, setSelectedPatient] = useState(null);
  
  
  useEffect(() => {
  const saved = localStorage.getItem("selectedPatient");

  if (saved) {
    const patient = JSON.parse(saved);

    setData({
      heartRate: patient.heartRate,
      spo2: patient.spo2,
      temperature: patient.temperature
    });

    setSelectedPatient(patient);

    localStorage.removeItem("selectedPatient"); 
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
  const healthScore = 100 - riskScore * 5;

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
    background: colors.background.card,
    border: `1px solid ${colors.ui.borderLight}`,
    boxShadow: colors.ui.shadowCard,
    padding: "18px",
    borderRadius: "14px",
    transition: "all 0.2s ease",
    cursor: "pointer"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    borderRadius: "10px",
    border: `1px solid ${colors.ui.borderLight}`,
    fontSize: "14px"
  };

   const getIcon = (msg) => {
    if (msg.includes("🚨")) {
      return <ErrorIcon style={{ color: colors.status.danger, fontSize: "22px" }} />;
    }

    if (msg.includes("⚠")) {
      return <WarningIcon style={{ color: colors.status.warning, fontSize: "22px" }} />;
    }

    if (msg.includes("📈")) {
      return <TrendingUpIcon style={{ color: colors.brand.secondary, fontSize: "22px" }} />;
    }

    if (msg.includes("📉")) {
      return <TrendingDownIcon style={{ color: colors.brand.secondary, fontSize: "22px" }} />;
    }

    if (msg.includes("📩")) {
      return <NotificationsActiveIcon style={{ color: colors.brand.primary, fontSize: "22px" }} />;
    }

    return <CheckCircleIcon style={{ color: colors.status.success, fontSize: "22px" }} />;
  };

    const [isMobile, setIsMobile] = useState(false);

      useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize(); 
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [userName, setUserName] = useState("");

    useEffect(() => {
      setUserName(localStorage.getItem("userName"));
    }, []);

  return (
    <div style={{
      padding: isMobile ? "20px" : "30px",

      background: colors.background.section,
      minHeight: "100vh"
    }}>
      
      {/* 🔷 NAVBAR */}
      <div style={{
        background: colors.background.card,
        boxShadow: colors.ui.shadowCard,
        padding: isMobile ? "12px 16px" : "15px 30px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "10px" : "0",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
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

            {selectedPatient?.name || userName || "Margaret Johnson"}
          </div>
          <div style={{ fontSize: "12px", color: colors.text.secondary }}>
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
            background: colors.background.hover,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <LogoutIcon style={{ fontSize: "20px", color: colors.text.primary }} />
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
      boxShadow: colors.ui.shadowHover
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
          onMouseOver={(e) =>
            e.currentTarget.style.background = colors.brand.primaryHover
          }
          onMouseOut={(e) =>
            e.currentTarget.style.background = colors.status.success
          }
          style={{
            padding: "10px 16px",
            borderRadius: "10px",
            border: "none",
            background: colors.status.success,
            color: colors.text.white,
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
            border: `1px solid ${colors.ui.borderLight}`,
            background: colors.background.card,
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
            color: colors.text.secondary,
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
            color: colors.text.secondary
          }}>
            <span>
              Last Updated: <strong style={{ color: colors.text.primary }}>{lastUpdated}</strong>
            </span>

            <span style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
              padding: "4px 10px",
              borderRadius: "999px",
              background: colors.status.successBg,
              color: colors.status.success,
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
              background: colors.background.hover,
              cursor: "pointer",
              boxShadow: colors.ui.shadowCard,
              fontWeight: "500"
            }}
          >
            ⚙ Custom Thresholds
          </button>

          {/* 🚨 SIMULATE EMERGENCY */}
          <button
            onMouseOver={(e) =>
              e.currentTarget.style.background = colors.status.danger
            }
            onMouseOut={(e) =>
              e.currentTarget.style.background = colors.status.danger
            }
            onClick={() =>
              setData({ heartRate: 140, spo2: 85, temperature: 39 })
            }
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              border: "none",
              background: colors.status.danger,
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              boxShadow: colors.ui.shadowCard,
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
              status === "EMERGENCY" ? colors.status.dangerBg :
              status === "WARNING" ? colors.status.warningBg :
              colors.status.successBg,

            color:
              status === "EMERGENCY" ? colors.status.danger :
              status === "WARNING" ? colors.status.warning :
              colors.status.success
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
              healthScore < 50 ? colors.status.danger :
              healthScore < 75 ? colors.status.warning :
              colors.status.success
            }`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700"
          }}>
            <span style={{ fontSize: "28px" }}>
              {healthScore}
            </span>
            <span style={{ fontSize: "12px", color: colors.text.secondary }}>
              /100
            </span>
          </div>

          {/* 📊 TEXT SECTION */}
          <div>
            <h3 style={{ marginBottom: "10px" }}>
              Daily Health Summary
            </h3>

            <p style={{ margin: "6px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingUpIcon style={{ fontSize: "18px", color: colors.brand.secondary }} />
            Health Score:
            <span style={{ color: colors.status.danger, fontWeight: "600" }}>
              {100 - riskScore * 5}/100
            </span>
          </p>

          <p style={{ margin: "6px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <WarningIcon style={{ fontSize: "18px", color: colors.status.warning }} />
            Warnings detected:
            <span style={{ fontWeight: "600" }}>
              {riskLevel === "MEDIUM" ? 1 : 0}
            </span>
          </p>

          <p style={{ margin: "6px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <ErrorIcon style={{ fontSize: "18px", color: colors.status.danger }} />
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
          color: heartRate > thresholds.heartRate
            ? colors.status.danger 
            : colors.status.success
        }}
      />
    }
    style={{
  border:
    heartRate > thresholds.heartRate
      ? `2px solid ${colors.status.danger}`
      : `1px solid ${colors.ui.borderLight}`,

  background:
    heartRate > thresholds.heartRate
      ? colors.status.dangerBg
      : colors.background.card
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
          color: spo2 < thresholds.spo2
            ? colors.status.warning
            : colors.status.success
        }}
      />
    }
    style={{
      border:
        spo2 < thresholds.spo2
          ? `2px solid ${colors.status.warning}`
          : `1px solid ${colors.ui.borderLight}`,

      background:
        spo2 < thresholds.spo2
          ? colors.status.warningBg
          : colors.background.card
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
            temperature > thresholds.temperature
              ? colors.status.danger
              : colors.status.success
        }}
      />
    }
    style={{
      border:
        temperature > thresholds.temperature
          ? `2px solid ${colors.status.danger}`
          : `1px solid ${colors.ui.borderLight}`,

      background:
        temperature > thresholds.temperature
          ? colors.status.dangerBg
          : colors.background.card
    }}
  />
</div>

        {/* 📈 AI INSIGHTS */}
        <AIInsightsCard 
          riskLevel={riskLevel}
          insights={insights}
        />

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
                  background: colors.status.success,
                  color: colors.text.white,
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "12px"
                }}>
                  24 Hours
                </span>
                <span style={{ fontSize: "12px", color: colors.text.muted }}>Weekly</span>
                <span style={{ fontSize: "12px", color: colors.text.muted }}>Monthly</span>
              </div>
            </div>

            <HeartRateChart data={history} dataKey="heartRate" color={colors.metrics.heartRate} />
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
                  background: colors.status.success,
                  color: colors.text.white,
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "12px"
                }}>
                  24 Hours
                </span>
                <span style={{ fontSize: "12px", color: colors.text.muted }}>Weekly</span>
                <span style={{ fontSize: "12px", color: colors.text.muted }}>Monthly</span>
              </div>
            </div>

            <HeartRateChart data={history} dataKey="spo2" color={colors.metrics.spo2} />
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
                  background: colors.status.success,
                  color: colors.text.white,
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "12px"
                }}>
                  24 Hours
                </span>
                <span style={{ fontSize: "12px", color: colors.text.muted }}>Weekly</span>
                <span style={{ fontSize: "12px", color: colors.text.muted }}>Monthly</span>
              </div>
            </div>

            <HeartRateChart data={history} dataKey="temperature" color={colors.metrics.temperature} />
          </div>

        </div>

        {/* 🧠 BOTTOM SECTION */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
          marginTop: "20px"
        }}>

        </div>

      </div>   
    </div>     
  );
}