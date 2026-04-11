import { useEffect, useState, useRef } from "react";
import AlertBanner from "../components/dashboard/AlertBanner";
import HeartRateChart from "../components/dashboard/HeartRateChart";
import VitalsGrid from "../components/dashboard/VitalsGrid";
import AIInsightsCard from "../components/dashboard/AIInsightsCard";
import HeaderSection from "../components/dashboard/HeaderSection";
import SettingsModal from "../components/dashboard/SettingsModal";
import { predictRisk, getRiskLevel } from "../utils/aiModel";
import { getAIResponse } from "../services/aiService";
import Navbar from "../components/common/Navbar";

import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { colors } from "../styles/colors";

export default function PatientDashboard() {
  const [data, setData] = useState({
    heartRate: 82,
    spo2: 95,
    temperature: 36.8
  });

  const { heartRate, spo2, temperature } = data;

  const [selectedPatient, setSelectedPatient] = useState(null);
  
  const [fallDetected, setFallDetected] = useState(false);

  const [aiData, setAIData] = useState(null);

  useEffect(() => {
  const fetchAI = async () => {
    const res = await getAIResponse({
      heartRate,
      spo2,
      temperature,
      fallDetected
    });

    setAIData(res);
  };

    fetchAI();
  }, [heartRate, spo2, temperature, fallDetected]);

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
        time: hours[indexRef.current], 
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

  // 🧠 AI LOGIC
  const riskScore = predictRisk(
    heartRate,
    spo2,
    temperature,
    thresholds
  );

  const riskLevel = getRiskLevel(riskScore);
  const healthScore = 100 - riskScore * 5;

  const lastUpdated = new Date().toLocaleTimeString();

  const status =
    fallDetected
      ? "EMERGENCY"
      : riskLevel === "HIGH"
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
      
    <Navbar
      isMobile={isMobile}
      userName={userName}
      selectedPatient={selectedPatient}
    />

      <div style={{ padding: "20px" }}>

      {showSettings && (
      <SettingsModal
        isMobile={isMobile}
        thresholds={thresholds}
        setThresholds={setThresholds}
        setShowSettings={setShowSettings}
      />
    )}

        {/* 🚨 ALERT */}
        <AlertBanner status={status} />

        {fallDetected && (
          <div style={{
            marginTop: "12px",
            padding: "12px",
            background: colors.status.dangerBg,
            color: colors.status.danger,
            border: `1px solid ${colors.status.danger}`,
            borderRadius: "10px"
          }}>
            🚨 Fall detected! Immediate attention required.
          </div>
        )}

        <HeaderSection
          isMobile={isMobile}
          lastUpdated={lastUpdated}
          status={status}
          setShowSettings={setShowSettings}
          setData={setData}
          setFallDetected={setFallDetected}
          fallDetected={fallDetected}
        />

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

        <VitalsGrid
          heartRate={heartRate}
          spo2={spo2}
          temperature={temperature}
          thresholds={thresholds}
          isMobile={isMobile}
        />


        {/* 📈 AI INSIGHTS */}
        {!aiData ? (
          <p style={{ marginTop: "20px" }}>🧠 Analyzing patient data...</p>
        ) : (
          <AIInsightsCard
            riskLevel={aiData.riskLevel}
            explanation={aiData.explanation}
            medical={aiData.medical}
            actions={aiData.actions}
          />
        )}

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