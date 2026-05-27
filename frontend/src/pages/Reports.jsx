import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";
import useVitals from "../hooks/useVitals";

import VitalChart from "../components/caregiver/VitalChart";

import FavoriteIcon from "@mui/icons-material/Favorite";
import OpacityIcon from "@mui/icons-material/Opacity";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import "../styles/caregiver/Reports.css";

export default function Reports() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { history } = useVitals(id);

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

  if (!summary) {
    return <div className="reports-container">Loading...</div>;
  }

  return (
    <div className="reports-container">
      
      <button className="btn" onClick={() => navigate(-1)}>
        Back
      </button>

      <h1 className="reports-title">Patient Reports</h1>

      {/* SUMMARY */}
      <div className="reports-summary-grid">

        <div className="reports-summary-card">
          <div className="reports-card-header">
            <span>Avg Heart Rate</span>
            <FavoriteIcon className="reports-icon" />
          </div>

          <div className="reports-card-value">
            {summary.avgHeartRate} <span>bpm</span>
          </div>
        </div>

        <div className="reports-summary-card">
          <div className="reports-card-header">
            <span>Avg SpO2</span>
            <OpacityIcon className="reports-icon" />
          </div>

          <div className="reports-card-value">
            {summary.avgSpO2} <span>%</span>
          </div>
        </div>

        <div className="reports-summary-card">
          <div className="reports-card-header">
            <span>Avg Temperature</span>
            <DeviceThermostatIcon className="reports-icon" />
          </div>

          <div className="reports-card-value">
            {summary.avgTemperature} <span>°C</span>
          </div>
        </div>

        <div className="reports-summary-card">
          <div className="reports-card-header">
            <span>Total Alerts</span>
            <WarningAmberIcon className="reports-icon alert" />
          </div>

          <div className="reports-card-value">
            {summary.totalAlerts}
          </div>
        </div>

      </div>

      {/* GRAPHS */}
      <div className="reports-grid">

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

    </div>
  );
}