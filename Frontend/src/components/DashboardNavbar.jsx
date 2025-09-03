import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Menu,
  Upload,
  X,
  Link2,
  QrCode,
  BarChart3,
  Wrench,
  History,
  HelpCircle,
} from "lucide-react"; // added icons
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSelector } from "react-redux";

const DashboardNavbar = (prop) => {
  const user = useSelector((state) => state.user);
  const { setActiveTab } = prop;

  // sidebar option data (easy to map)
  const navItems = [
    { label: "Link", icon: Link2, bg: "#204279" },
    { label: "QR Code", icon: QrCode, bg: "#1c3d55" },
    { label: "Analytics", icon: BarChart3, bg: "#2d4d3a" },
    { label: "History", icon: History, bg: "#44426d" },
  ];

  return (
    <nav className="flex h-screen bg-[#090b0b] text-white">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-72 flex-col justify-between pt-6 pl-4 bg-[#090b0b]">
        <div className="space-y-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Link2 className="w-6 h-6" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-100 to-blue-400 bg-clip-text text-transparent">
              Shortify
            </span>
          </Link>

          {/* Profile */}
          <div className="flex items-center p-4 gap-3 rounded-lg hover:bg-[#1d1f1f]">
            <img
              // src="https://via.placeholder.com/40"
              alt="profile"
              className="rounded-full w-12 h-12"
            />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-400">@{user.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 space-y-2">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center text-white p-1 rounded-full bg-none hover:bg-gradient-to-r from-[#8ab6ff] via-[#14263c] to-[#090b0b] transition-colors"
                  onClick={() => setActiveTab(item.label)}
                >
                  <Icon
                    size={24}
                    className={`h-10 w-10 p-3 rounded-full`}
                    style={{ backgroundColor: item.bg }}
                  />
                  <Button
                    variant="ghost"
                    className="justify-start hover:bg-transparent hover:text-white text-white"
                  >
                    {item.label}
                  </Button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Quick / Advance Toggle */}
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <span className="text-sm">Quick</span>
          <Switch defaultChecked />
          <span className="text-sm">Advance</span>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden absolute top-4 left-4">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#090b0b] text-white p-0">
          <div className="flex flex-col h-full justify-between">
            <div>
              {/* Mobile profile */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-800">
                <img
                  // src="https://via.placeholder.com/40"
                  alt="profile"
                  className="rounded-full w-12 h-12"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-400">@{user.email}</p>
                </div>
              </div>

              {/* Mobile nav */}
              <nav className="mt-6 space-y-2 px-2">
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center text-white p-1 rounded-full bg-none hover:bg-gradient-to-r from-[#8ab6ff] via-[#14263c] to-[#090b0b] transition-colors"
                    >
                      <Icon
                        size={24}
                        className={`h-10 w-10 p-3 rounded-full`}
                        style={{ backgroundColor: item.bg }}
                      />
                      <Button
                        variant="ghost"
                        className="justify-start hover:bg-transparent hover:text-white text-white"
                      >
                        {item.label}
                      </Button>
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-gray-800 flex items-center justify-between">
              <span className="text-sm">Quick</span>
              <Switch defaultChecked />
              <span className="text-sm">Advance</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default DashboardNavbar;
