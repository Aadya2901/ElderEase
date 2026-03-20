import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { ResponsiveContainer } from "recharts";

export default function HeartRateChart({ data, dataKey, color }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="time" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip />

        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}