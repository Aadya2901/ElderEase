import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function HeartRateChart({ data, dataKey, color }) {
  return (
    <LineChart width={300} height={200} data={data}>
      <XAxis hide />
      <YAxis hide />
      <Tooltip />

      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  );
}