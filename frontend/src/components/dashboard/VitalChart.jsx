import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer
} from "recharts";

export default function VitalChart({
 data = [],
 dataKey,
 title,
 color,
 unit
}) {

 const chartData = data
  .slice(0, 15)
  .reverse()
  .map((item, index) => ({
    reading: index + 1,
    value: item[dataKey] ?? item.temperature ?? 0
  }));

 return (
  <div className="card">

    <h3 style={{ marginBottom: "6px" }}>{title}</h3>

    <p style={{ fontSize: "12px", color: "#6b7280" }}>
      X-axis: Reading Number <br />
      Y-axis: {unit}
    </p>

    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData}>

        <CartesianGrid stroke="#E5EFE8" strokeDasharray="3 3" />

        <XAxis dataKey="reading" tick={{ fontSize: 12 }} />

        <YAxis tick={{ fontSize: 12 }} />

        <Tooltip formatter={(v) => `${v} ${unit}`} />

        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={3}
          dot={{ r: 3 }}
        />

      </LineChart>
    </ResponsiveContainer>

  </div>
 );
}