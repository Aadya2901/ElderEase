import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer,
 Legend
} from "recharts";

export default function VitalChart({
 data
}){

 const chartData =
  data.slice(0,15)
  .reverse()
  .map((item,index)=>({

   reading:index + 1,
   heartRate:item.heartRate,
   spo2:item.spo2,
   temp:item.temp

  }));

 return(

 <div className="card">

  <h3>
   Vital Signs Trend
  </h3>

  <p>
   X-axis: Reading sequence (oldest to latest)  
   Y-axis: Vital values
  </p>

  <ResponsiveContainer
   width="100%"
   height={350}
  >

  <LineChart data={chartData}>

   <CartesianGrid strokeDasharray="3 3" />

   <XAxis
    dataKey="reading"
    label={{
     value:"Reading Number",
     position:"insideBottom",
     offset:-5
    }}
   />

   <YAxis
    label={{
     value:"Measured Value",
     angle:-90,
     position:"insideLeft"
    }}
   />

   <Tooltip />

   <Legend />

   <Line
    type="monotone"
    dataKey="heartRate"
    name="Heart Rate (bpm)"
    stroke="#ef4444"
   />

   <Line
    type="monotone"
    dataKey="spo2"
    name="SpO2 (%)"
    stroke="#3b82f6"
   />

   <Line
    type="monotone"
    dataKey="temp"
    name="Temp (°F)"
    stroke="#10b981"
   />

  </LineChart>

  </ResponsiveContainer>

 </div>

 );
}