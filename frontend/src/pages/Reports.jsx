import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

import useVitals from "../hooks/useVitals";
import VitalsGrid from "../components/dashboard/VitalsGrid";
import VitalChart from "../components/dashboard/VitalChart";

import Navbar from "../components/common/Navbar";

import FavoriteIcon from "@mui/icons-material/Favorite";
import OpacityIcon from "@mui/icons-material/Opacity";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import "../styles/Reports.css";

export default function Reports(){

 const { id } = useParams();
 const navigate = useNavigate();

 const { history, latest } = useVitals(id);

 const [summary, setSummary] = useState(null);
 const [alerts, setAlerts] = useState([]);

 useEffect(() => {

  const loadData = async () => {
   try {
    const res1 = await api.get(`/reports/${id}/summary`);
    const res2 = await api.get(`/reports/${id}/alerts`);

    setSummary(res1.data);
    setAlerts(res2.data);

   } catch (err) {
    console.log(err);
   }
  };

  loadData();

  const timer = setInterval(loadData, 10000);
  return () => clearInterval(timer);

 }, [id]);

 if(!summary){
  return <div className="reports-container">Loading...</div>;
 }

 const hr = latest?.heartRate || 0;
 const spo2 = latest?.spo2 || 0;
 const temp = latest?.temperature || 0;

 return(

  <>
    <Navbar
    />

  <div className="reports-container">

   <button className="btn" onClick={()=>navigate(-1)}>
    Back
   </button>

   <h1 className="reports-title">Patient Reports</h1>

   {/* 🔥 SUMMARY */}
   <div className="summary-grid">

    <div className="summary-card clean">
      <div className="card-header">
        <span>Avg Heart Rate</span>
        <FavoriteIcon className="icon" />
      </div>

      <div className="card-value">
        {summary.avgHeartRate} <span>bpm</span>
      </div>
    </div>

    <div className="summary-card clean">
      <div className="card-header">
        <span>Avg SpO2</span>
        <OpacityIcon className="icon" />
      </div>

      <div className="card-value">
        {summary.avgSpO2} <span>%</span>
      </div>
    </div>

    <div className="summary-card clean">
      <div className="card-header">
        <span>Avg Temperature</span>
        <DeviceThermostatIcon className="icon" />
      </div>

      <div className="card-value">
        {summary.avgTemperature} <span>°C</span>
      </div>
    </div>

    <div className="summary-card clean">
      <div className="card-header">
        <span>Total Alerts</span>
        <WarningAmberIcon className="icon alert" />
      </div>

      <div className="card-value">
        {summary.totalAlerts}
      </div>
    </div>

  </div>

   {/* 🔥 3 GRAPHS IN ONE ROW */}
   <div className="report-grid">

    <VitalChart
      data={history}
      dataKey="heartRate"
      title="Heart Rate Trend"
      color="#ef4444"
      unit="bpm"
    />

    <VitalChart
      data={history}
      dataKey="spo2"
      title="Oxygen Saturation Trend"
      color="#3b82f6"
      unit="%"
    />

    <VitalChart
      data={history}
      dataKey="temp"
      title="Temperature Trend"
      color="#10b981"
      unit="°C"
    />

   </div>

   {/* 🔥 ALERTS BELOW */}
   {/* <div className="alert-card">
    <h3>Latest Alerts</h3>

    {alerts.length === 0 ? (
      <p>No alerts</p>
    ) : (
      alerts.slice(0, 5).map((a, index) => {
        const alertTime = a.createdAt
          ? new Date(a.createdAt).toLocaleString()
          : "Time not available";

        return (
          <div key={index} className="alert-box">
            <div style={{ fontWeight: "bold" }}>
              ⚠ {a.type || "Health Alert"}
            </div>

            <div>
              {a.message || "Abnormal vital detected"}
            </div>

            <small>Time: {alertTime}</small>
            <br />
            <small>Status: {a.status || "active"}</small>
          </div>
        );
      })
    )}
   </div> */}

  </div>
  </>
 );
}