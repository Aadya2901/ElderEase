import { useNavigate } from "react-router-dom";

export default function PatientCard({ patient }){

 const navigate = useNavigate();

const vital = patient.latestVital || {};

const hr = vital.heartRate || 0;
const spo2 = vital.spo2 || 0;
const temp = vital.temp ?? vital.temperature ?? 0;

let hrStatus = "Normal";

if(hr < 60) hrStatus = "Low";
if(hr > 100) hrStatus = "High";

const oxy =
 spo2 < 95
 ? "Low Oxygen"
 : "Good";
  

//  const critical =
//   patient.activeAlerts > 0;
const critical =
  hr < 60 ||
  hr > 100 ||
  spo2 < 95 ||
  temp > 100;
  
 return(
  <div
   className="card"
   style={{
    borderLeft:
     critical
      ? "6px solid #ef4444"
      : "6px solid #10b981"
   }}
  >

   <h2>{patient.name}</h2>

   <p>{patient.relation}</p>

   <hr />

   <p>❤️ HR: {vital.heartRate}</p>
   <p>🩸 SpO2: {vital.spo2}%</p>
   <p>🌡 Temp: {vital.temp ?? vital.temperature ?? "--"}°C</p>

   <p>HR Status: {hrStatus}</p>
   <p>Oxygen: {oxy}</p>

   <div
    className={
     critical
      ? "badge-red"
      : "badge-green"
    }
   >
    {critical ? "Critical" : "Stable"}
   </div>

   <br /><br />

   <button
    className="btn"
    onClick={()=>
      navigate(
       `/patient/${patient.userId}`
      )
    }
   >
    View Details
   </button>

  </div>
 );
}