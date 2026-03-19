import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function HeartRateChart() {

  const data = [
    { time: "10:00", hr: 72 },
    { time: "10:05", hr: 78 },
    { time: "10:10", hr: 85 },
    { time: "10:15", hr: 90 },
    { time: "10:20", hr: 82 },
    { time: "10:25", hr: 88 }
  ];

  return (
    <div style={{
      marginTop: "30px",
      padding: "20px",
      background: "#f9fafb",
      borderRadius: "12px"
    }}>
      <h3>Heart Rate Trend</h3>

      {/* FIXED WIDTH + HEIGHT (IMPORTANT) */}
      <LineChart width={500} height={250} data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="hr" 
          stroke="#ef4444" 
          strokeWidth={3}
        />
      </LineChart>
    </div>
  );
}