import { useEffect, useState } from "react";
import {
 useParams,
 useNavigate
} from "react-router-dom";

import api from "../services/api";
import StatCard from "../components/dashboard/StatCard";

import {
 ResponsiveContainer,
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 Legend
} from "recharts";

export default function Reports(){

 const { id } = useParams();
 const navigate = useNavigate();

 const [summary,setSummary] =
  useState(null);

 const [trends,setTrends] =
  useState([]);

 const [alerts,setAlerts] =
  useState([]);

useEffect(() => {

 const loadData = async () => {

  try {

   const res1 =
    await api.get(
     `/reports/${id}/summary`
    );

   const res2 =
    await api.get(
     `/reports/${id}/trends`
    );

   const res3 =
    await api.get(
     `/reports/${id}/alerts`
    );

   setSummary(res1.data);
   setTrends(res2.data);
   setAlerts(res3.data);

  } catch (err) {
   console.log(err);
  }

 };

 loadData();

 const timer =
  setInterval(loadData, 5000);

 return () =>
  clearInterval(timer);

}, [id]);

 if(!summary){
  return(
   <div className="container">
    Loading...
   </div>
  );
 }

 const chartData =
  trends.slice(0,15)
  .reverse()
  .map((item,index)=>({
   reading:index + 1,
   heartRate:item.heartRate,
   spo2:item.spo2,
   temp: item.temperature ?? item.temp
  }));

 return(
  <div className="container">

   <button
    className="btn"
    onClick={()=>navigate(-1)}
   >
    Back
   </button>

   <h1 className="title">
    Patient Reports
   </h1>

   {/* SUMMARY */}
   <div className="grid">

    <StatCard
     title="Avg HR"
     value={summary.avgHeartRate}
    />

    <StatCard
     title="Avg SpO2"
     value={summary.avgSpO2 + "%"}
    />

    <StatCard
     title="Avg Temp"
     value={summary.avgTemperature + "°C"}
    />

    <StatCard
     title="Total Alerts"
     value={summary.totalAlerts}
    />

   </div>

   <br />

   {/* TWO COLUMN AREA */}
   <div className="report-grid">

    {/* HR */}
    <div className="card">
     <h3>
      Heart Rate Trend
     </h3>

     <p>
      X-axis: Reading Number
      <br />
      Y-axis: BPM
     </p>

     <ResponsiveContainer
      width="100%"
      height={280}
     >
      <LineChart data={chartData}>
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="reading" />
       <YAxis />
       <Tooltip />
       <Legend />

       <Line
        type="monotone"
        dataKey="heartRate"
        stroke="#ef4444"
        name="Heart Rate"
       />

      </LineChart>
     </ResponsiveContainer>
    </div>

    {/* SpO2 */}
    <div className="card">
     <h3>
      Oxygen Saturation Trend
     </h3>

     <p>
      X-axis: Reading Number
      <br />
      Y-axis: SpO2 %
     </p>

     <ResponsiveContainer
      width="100%"
      height={280}
     >
      <LineChart data={chartData}>
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="reading" />
       <YAxis />
       <Tooltip />
       <Legend />

       <Line
        type="monotone"
        dataKey="spo2"
        stroke="#2563eb"
        name="SpO2"
       />

      </LineChart>
     </ResponsiveContainer>
    </div>

    {/* Temp */}
    <div className="card">
     <h3>
      Temperature Trend
     </h3>

     <p>
      X-axis: Reading Number
      <br />
      Y-axis: °C
     </p>

     <ResponsiveContainer
      width="100%"
      height={280}
     >
      <LineChart data={chartData}>
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="reading" />
       <YAxis />
       <Tooltip />
       <Legend />

       <Line
        type="monotone"
        dataKey="temp"
        stroke="#10b981"
        name="Temperature"
       />

      </LineChart>
     </ResponsiveContainer>
    </div>

    {/*Alerts*/}
    {/* <div className="card">

     <h3>
      Latest 5 Alerts
     </h3>

     {alerts.length===0 ? (
      <p>No alerts</p>
     ) : (
      alerts
      .slice(0,5)
      .map((a,index)=>(
       <div
        key={index}
        className="alert-box"
       >
        ⚠ {a.message}
       </div>
      ))
     )}

    </div> */}
    {/* Alerts */}
<div className="card">
  <h3>Latest 5 Alerts</h3>

  {alerts.length === 0 ? (
    <p>No alerts</p>
  ) : (
    alerts
      .slice(0, 5)
      .map((a, index) => {
        const alertTime = a.createdAt
          ? new Date(a.createdAt).toLocaleString()
          : "Time not available";

        return (
          <div
            key={index}
            className="alert-box"
          >
            <div style={{ fontWeight: "bold" }}>
              ⚠ {a.type || "Health Alert"}
            </div>

            <div>
              {a.message || "Abnormal vital detected"}
            </div>

            <small>
              Time: {alertTime}
            </small>

            <br />

            <small>
              Status: {a.status || "active"}
            </small>
          </div>
        );
      })
  )}
</div>

   </div>

  </div>
 );
}