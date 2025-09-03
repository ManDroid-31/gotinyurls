"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, Map } from "lucide-react";

const demographics = [
  { country: "India", flag: "🇮🇳", percent: 60 },
  { country: "United States", flag: "🇺🇸", percent: 20 },
  { country: "Brazil", flag: "🇧🇷", percent: 12 },
  { country: "Denmark", flag: "🇩🇰", percent: 8 },
];

const ClicksDemographics = () => {
  return (
    <Card
      className="
        bg-[#080808] border-0 text-white 
        w-full lg:w-[40%] 
        max-w-md rounded-2xl p-4
      "
    >
      <CardContent className="flex flex-col gap-6 p-0">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="text-md font-medium flex items-center gap-1">
            <Map size={20} /> Clicks Demographics
          </span>
        </div>

        {/* Click Count */}
        <div>
          <h2 className="text-4xl tracking-wide text-blue-200">567</h2>
          <p className="text-gray-400 text-sm">Global Clicks worldwide</p>
        </div>

        {/* Countries */}
        <div className="flex flex-col gap-4">
          {demographics.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.flag}</span>
                  <span className="text-sm">{item.country}</span>
                </div>
                <span className="text-sm font-medium">{item.percent}%</span>
              </div>
              <Progress
                value={item.percent}
                className="h-2 bg-gray-700 
                  [&>div]:bg-gradient-to-r 
                  [&>div]:from-blue-900 
                  [&>div]:via-blue-700 
                  [&>div]:to-blue-200"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-blue-400 transition">
          See all Demographics <ArrowUpRight size={14} />
        </button>
      </CardContent>
    </Card>
  );
};

export default ClicksDemographics;
