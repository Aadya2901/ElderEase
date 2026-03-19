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
    { time: "10:15", hr: 90 }
  ];

  return (
    <div style={{
      marginTop: "20px",
      padding: "20px",
      background: "#f9fafb",
      borderRadius: "12px"
    }}>
      <h3>Heart Rate Trend</h3>

      <LineChart width={500} height={250} data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="hr" stroke="#ef4444" />
      </LineChart>
    </div>
  );
}