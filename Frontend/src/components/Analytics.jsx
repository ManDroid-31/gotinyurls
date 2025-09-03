import React, { useState, useEffect } from "react";
import { Calendar22 } from "./Calendar";
import { SelectUrl } from "./SelectUrl";
import { CircleX } from "lucide-react";
import WorldGlobe from "./WorldGlobe";
import useGetAnalytics from "@/hooks/useGetAnalytics";
import { Map } from "lucide-react";
import ClicksDemographics from "./ClicksDemographics";
import ClicksOverTime from "./ClickOverTime";

const Analytics = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const { getAnalytics, loading, error } = useGetAnalytics();
  const [points, setPoints] = useState([]);

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedUrl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAnalytics(startDate, endDate, selectedUrl);
        console.log(res.points);
        setPoints(res.points);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };

    fetchData();
  }, [getAnalytics, startDate, endDate, selectedUrl]);

  return (
    <div className="flex flex-col rounded-lg gap-6">
      {/* Header */}
      <h3 className="text-2xl lg:text-3xl text-[#dbdbda] font-medium">
        Analytics
      </h3>

      {/* Filter Bar */}
      <div
        className="flex flex-col lg:flex-row gap-4 
                   bg-[#1e1e1e] border border-gray-700 rounded-xl p-4"
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 w-full">
          {/* Start Date */}
          <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
            <label className="text-sm text-gray-400 px-1">Start Date</label>
            <Calendar22 date={startDate} setDate={setStartDate} />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
            <label className="text-sm text-gray-400 px-1">End Date</label>
            <Calendar22 date={endDate} setDate={setEndDate} />
          </div>

          {/* URL Select */}
          <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
            <label className="text-sm text-gray-400 px-1">Select URL</label>
            <SelectUrl value={selectedUrl} onChange={setSelectedUrl} />
          </div>
        </div>

        {/* Clear Button */}
        <div className="flex justify-end lg:items-start mt-4 lg:mt-0">
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-3 py-2 rounded-lg 
                       bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] hover:text-white 
                       transition-colors duration-200"
          >
            <CircleX className="w-4 h-4" />
            <span className="text-sm font-medium">Clear Filters</span>
          </button>
        </div>
      </div>

      {/* Globe Section */}
      <div className="flex flex-col w-full lg:flex-row gap-6">
        <ClicksDemographics />
        <WorldGlobe points={points} />
      </div>
      <ClicksOverTime />
    </div>
  );
};

export default Analytics;
