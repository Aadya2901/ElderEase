import { useEffect, useState } from "react";
import {
 useParams,
 useNavigate
} from "react-router-dom";

import api from "../services/api";
import StatCard from "../components/dashboard/StatCard";
import useVitals from "../hooks/useVitals";
import VitalsGrid from "../components/dashboard/VitalsGrid";
import VitalChart from "../components/dashboard/VitalChart";

export default function PatientDetail(){

 const { id } = useParams();
 const navigate = useNavigate();

 const { history, latest } = useVitals(id);

 const [data,setData] =
  useState(null);

 useEffect(()=>{

  const loadData = async()=>{

   try{

    const res =
     await api.get(`/caregiver/patient/${id}/detail`)

    setData(res.data);

   }catch(err){
 console.log("DETAIL ERROR:", err.response?.data || err.message);
 setData({ latestVital:{}, alerts:[] });
}

  };

  loadData();

  const timer =
   setInterval(loadData, 10000);

  return ()=>clearInterval(timer);

 },[id]);

 if(!data){
  return(
   <div className="container">
    Loading...
   </div>
  );
 }

  const hr = latest?.heartRate || 0;
  const spo2 = latest?.spo2 || 0;
  const temp = latest?.temperature || 0;

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
  <h3 style={{ marginBottom: "10px" }}>
  Current Vitals
</h3>
  <VitalsGrid
    heartRate={hr}
    spo2={spo2}
    temperature={temp}
    thresholds={{
      heartRate: { low: 60, high: 100 },
      spo2: { low: 95 },
      temperature: { high: 100 }
    }}
    isMobile={false}
  />

   <br />

   {/* TWO COLUMN */}
   <div className="report-grid">

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