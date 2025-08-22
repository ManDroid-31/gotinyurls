// src/components/AnalyticsChart.jsx
import React from "react";
import { ChartSpline } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const data = ;

const AnalyticsChart = () => {
  const urls = useSelector((state) => state.urls.urls);
  const [totalClicks, setTotalClicks] = useState(0);
  const [dailyAverage, setDailyAverage] = useState(0);

  const [data, setData] = useState([
    { date: "Jan 08", clicks: 50 },
    { date: "Jan 09", clicks: 90 },
    { date: "Jan 10", clicks: 70 },
    { date: "Jan 11", clicks: 100 },
    { date: "Jan 12", clicks: 130 },
    { date: "Jan 13", clicks: 160 },
    { date: "Jan 14", clicks: 200 },
  ]);

  useEffect(() => {
    if (!urls || urls.length === 0) return;

    const aggregated = urls.reduce((acc, url) => {
      url.dailyClicks.forEach((day) => {
        const d = day.date; // already in YYYY-MM-DD
        if (!acc[d]) {
          acc[d] = 0;
        }
        acc[d] += day.clicks;
      });
      return acc;
    }, {});

    // Convert to array for recharts
    const formatted = Object.entries(aggregated).map(([date, clicks]) => ({
      date,
      clicks,
    }));
    formatted.sort((a, b) => new Date(a.date) - new Date(b.date));
    const last7Days = formatted.slice(-7);

    setData(last7Days);
    const total = last7Days.reduce((sum, entry) => sum + entry.clicks, 0);
    const dailyAverage = total / last7Days.length;
    setTotalClicks(total);
    setDailyAverage(parseInt(dailyAverage));
  }, [urls]);

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
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="#aaa"
            tick={{ dy: 10 }}
            // label={{
            //   value: "Date",
            //   position: "insideBottom", // or "insideBottomRight" / "bottom"
            //   dy: 25, // 👈 pushes the axis label further down so it doesn’t overlap
            //   style: { fill: "#aaa", fontSize: 14 },
            // }}
          />
          <YAxis
            stroke="#aaa"
            label={{
              value: "Clicks",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#aaa" },
            }}
          />
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
