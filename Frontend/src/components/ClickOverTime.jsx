"use client";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "01/01", clicks: 30 },
  { date: "02/01", clicks: 40 },
  { date: "03/01", clicks: 55 },
  { date: "04/01", clicks: 65 },
  { date: "05/01", clicks: 70 },
  { date: "06/01", clicks: 80 },
  { date: "07/01", clicks: 60 },
  { date: "08/01", clicks: 90 },
  { date: "09/01", clicks: 100 },
  { date: "10/01", clicks: 75 },
];

export default function ClicksOverTime() {
  return (
    <div className="bg-[#0f0f0f] p-4 rounded-2xl shadow-lg">
      <h3 className="text-white mb-3">Clicks and Scan over time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          {/* Gradient */}
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Axis */}
          <XAxis dataKey="date" stroke="#aaa" tick={{ fill: "#aaa" }} />
          <YAxis stroke="#aaa" tick={{ fill: "#aaa" }} />
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
