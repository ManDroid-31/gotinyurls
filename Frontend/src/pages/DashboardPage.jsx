import { useState } from "react";
import { Eye, EyeOff, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Calendar } from "@/components/ui/calendar";
import { Calendar22 } from "@/components/Calendar";

import CreateLinkForm from "@/components/CreateLinkForm";
import Dashboard from "@/components/Dashboard";
import Analytics from "@/components/rmAnalytics";
import History from "@/components/History";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-[#090b0b] text-white">
      <DashboardNavbar setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-[#111111] px-8 py-4 rounded-lg h-full">
          <div>
            <div className="flex items-center gap-2 text-gray-400 mb-4 py-6 border-b-2 border-[#262626]">
              <House className="h-4 w-4" />
              <div className="text-sm">&gt; Dashboard &gt; Link</div>
            </div>
          </div>
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "Link" && <CreateLinkForm />}
          {activeTab === "QR Code" && <Analytics />}
          {activeTab === "Analytics" && <Analytics />}
          {activeTab === "History" && <History />}
        </div>
      </main>
    </div>
  );
}
