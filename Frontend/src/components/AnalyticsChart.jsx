// src/components/AnalyticsChart.jsx
import React from "react";
import { ChartSpline } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Jan 08", clicks: 50 },
  { date: "Jan 09", clicks: 90 },
  { date: "Jan 10", clicks: 70 },
  { date: "Jan 11", clicks: 100 },
  { date: "Jan 12", clicks: 130 },
  { date: "Jan 13", clicks: 160 },
  { date: "Jan 14", clicks: 200 },
];

const AnalyticsChart = () => {
  const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
  const dailyAverage = Math.round(totalClicks / data.length);

  return (
    <div className="p-6 bg-[#131320]  rounded-xl w-full text-white shadow-lg h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center ">
          <ChartSpline className="h-5 w-5" />
          <h2 className="text-md font-semibold">7-Day Analytics</h2>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-xl font-bold">{totalClicks}</div>
          <div className="text-gray-500 text-md">Total Clicks</div>
        </div>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#fff"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Daily Average */}
      <div className="mt-4 p-3 bg-gray-800 rounded-lg flex justify-between items-center">
        <span>Daily Average</span>
        <span className="font-bold">{dailyAverage} clicks</span>
      </div>
    </div>
  );
};

export default AnalyticsChart;
