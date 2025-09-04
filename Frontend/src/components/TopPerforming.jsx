"use client";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";

export default function TopPerforming({ date, clicks }) {
  return (
    <Card className="bg-[#1a1a1a] rounded-2xl shadow-md text-white p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Top performing Date</h3>
        <button className="p-1 rounded-md hover:bg-[#2a2a2a]">
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <CardContent className="mt-3 p-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="text-base font-medium">{date}</span>
        </div>
        <span className="bg-blue-700 px-3 py-1 text-sm rounded-md">
          {clicks} Clicks
        </span>
      </CardContent>
    </Card>
  );
}
