import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ChartLine } from "lucide-react";

export default function ClicksOverTime({ data }) {
  return (
    <div className="bg-[#1b1a1a] w-full p-4 rounded-2xl shadow-lg">
      <h3 className="text-white mb-3 font-medium text-md flex items-center gap-2">
        <ChartLine size={20} /> Clicks and Scan over time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          margin={{ top: 20, right: 0, left: 0, bottom: 30 }}
          data={data}
        >
          {/* Gradient */}
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Axis */}
          <XAxis
            dataKey="date"
            stroke="#aaa"
            angle={-30}
            textAnchor="end"
            tick={{ fill: "#aaa", fontSize: 12 }}
            tickMargin={10} // add margin so labels don't clip
          />
          <YAxis
            stroke="#aaa"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#aaa", fontSize: 14 }}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          {/* Area (fill under line) */}
          <Area
            type="linear"
            dataKey="clicks"
            stroke="none"
            fill="url(#colorClicks)"
          />

          {/* Line on top */}
          <Line
            type="linear"
            dataKey="clicks"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{
              r: 5,
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#3b82f6",
            }}
            activeDot={{
              r: 7,
              stroke: "#60a5fa",
              strokeWidth: 2,
              fill: "#1d4ed8",
            }}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
