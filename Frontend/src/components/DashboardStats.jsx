import { MousePointer, Link, ChartColumn } from "lucide-react";
import { useState } from "react";

const DashboardStats = () => {
  const [totalUrls, setTotalUrls] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [thisWeek, setThisWeek] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total URLs Card */}
      <div className="rounded-xl text-card-foreground shadow-lg border-0 bg-gradient-to-br from-blue-950/20 to-cyan-950/20">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#24282F] rounded-full">
              <Link className="h-6 w-6 text-white" />
            </div>
            <div className="text-white">
              <p className="text-sm font-medium text-white">Total URLs</p>
              <p className="text-2xl font-bold">{totalUrls}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Clicks Card */}
      <div className="rounded-xl text-card-foreground shadow-lg border-0 bg-gradient-to-br from-green-950/20 to-emerald-950/20">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/10 rounded-full">
              <MousePointer className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Clicks
              </p>
              <p className="text-2xl font-bold text-white">{totalClicks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* This Week Card */}
      <div className="rounded-xl text-card-foreground shadow-lg border-0 bg-gradient-to-br from-purple-950/20 to-pink-950/20">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/10 rounded-full">
              <ChartColumn className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                This Week
              </p>
              <p className="text-2xl text-white font-bold">{thisWeek}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
