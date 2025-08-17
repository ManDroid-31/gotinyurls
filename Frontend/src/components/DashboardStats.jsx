import React from "react";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total URLs Card */}
      <div className="rounded-xl text-card-foreground shadow-lg border-0 bg-gradient-to-br from-blue-950/20 to-cyan-950/20">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#24282F] rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white"
              >
                <path d="M9 17H7A5 5 0 0 1 7 7h2"></path>
                <path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>
                <line x1="8" x2="16" y1="12" y2="12"></line>
              </svg>
            </div>
            <div className="text-white">
              <p className="text-sm font-medium text-white">Total URLs</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Clicks Card */}
      <div className="rounded-xl text-card-foreground shadow-lg border-0 bg-gradient-to-br from-green-950/20 to-emerald-950/20">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-green-600"
              >
                <path d="M12.586 12.586 19 19"></path>
                <path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Clicks
              </p>
              <p className="text-2xl font-bold text-white">2,535</p>
            </div>
          </div>
        </div>
      </div>

      {/* This Week Card */}
      <div className="rounded-xl text-card-foreground shadow-lg border-0 bg-gradient-to-br from-purple-950/20 to-pink-950/20">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                <path d="M18 17V9"></path>
                <path d="M13 17V5"></path>
                <path d="M8 17v-3"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                This Week
              </p>
              <p className="text-2xl text-white font-bold">757</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
