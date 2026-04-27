import { useEffect, useState } from "react";
import {
 useParams,
 useNavigate
} from "react-router-dom";

import api from "../services/api";
import StatCard from "../components/StatCard";


export default function PatientDetail(){

 const { id } = useParams();
 const navigate = useNavigate();

 const [data,setData] =
  useState(null);

 useEffect(()=>{

  const loadData = async()=>{

   try{

    const res =
     await api.get(
 `/caregiver/patient/${id}/detail`
);

    setData(res.data);

   }catch(err){
 console.log("DETAIL ERROR:", err.response?.data || err.message);
 setData({ latestVital:{}, alerts:[] });
}

  };

  loadData();

  const timer =
   setInterval(loadData,5000);

  return ()=>clearInterval(timer);

 },[id]);

 if(!data){
  return(
   <div className="container">
    Loading...
   </div>
  );
 }

 const vital =
  data.latestVital || {};

 const hr =
  vital.heartRate || 0;

 const spo2 =
  vital.spo2 || 0;

const temp = vital.temp ?? vital.temperature ?? 0;

 let status = "Stable";

 if(
  hr > 100 ||
  spo2 < 95 ||
  temp > 100
 ){
  status = "Attention Needed";
 }

 return(
  <div className="container">

   <button
    className="btn"
    onClick={()=>navigate(-1)}
   >
    Back
   </button>

   <h1 className="title">
    Patient Detail
   </h1>

   <p className="subtitle">
    Monitoring ID: {id}
   </p>

   {/* TOP STATS */}
   <div className="grid">

    <StatCard
     title="Heart Rate"
     value={hr + " bpm"}
    />

    <StatCard
     title="SpO2"
     value={spo2 + "%"}
    />

    <StatCard
     title="Temperature"
     value={temp + "°C"}
    />

    <StatCard
     title="Status"
     value={status}
    />

   </div>

   <br />

   {/* TWO COLUMN */}
   <div className="report-grid">

    {/* Vital Card */}
    <div className="card">

     <h3>
      Latest Vital Snapshot
     </h3>

     <p>
      Live values refreshed every 5 sec
     </p>

     <p>❤️ Heart Rate: {hr} bpm</p>
     <p>🩸 SpO2: {spo2}%</p>
     <p>🌡 Temperature: {temp}°F</p>

    </div>

    {/* Health Analysis */}
    <div className="card">

     <h3>
      Health Analysis
     </h3>

     <p>
      Current system evaluation
     </p>

     <p>
      Heart Rate:
      {hr < 60
       ? " Low"
       : hr > 100
       ? " High"
       : " Normal"}
     </p>

     <p>
      Oxygen:
      {spo2 < 95
       ? " Low"
       : " Good"}
     </p>

     <p>
      Temperature:
      {temp > 100
       ? " Fever Risk"
       : " Normal"}
     </p>

    </div>

    {/* Alerts
    <div className="card">

     <h3>
      Latest Alerts
     </h3>

     {data.alerts?.length===0 ? (
      <p>No alerts</p>
     ) : (
      data.alerts
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
        {/* Quick Actions */}
    <div className="card">

     <h3>
      Quick Actions
     </h3>

     <button
      className="btn"
      onClick={()=>
       navigate(`/reports/${id}`)
      }
     >
      Open Full Reports
     </button>

    </div>

    {/* Alerts */}
<div className="card">
  <h3>Latest Alerts</h3>

  {data.alerts?.length === 0 ? (
    <p>No alerts</p>
  ) : (
    data.alerts
      .slice(0, 1)
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