import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
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
  User,
  LogOut,
  HelpCircle,
} from "lucide-react"; // added icons
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSelector } from "react-redux";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

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
          <div>
            <Link to="/">
              <img width={160} src={logo} alt="" />
            </Link>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#1d1f1f] bg-[#131414]">
            {/* Left side: avatar + name */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800">
                <User size={22} className="text-gray-300" />
              </div>
              <div>
                <p className="font-medium">{truncateText(user.name, 15)}</p>
                <p className="text-xs text-gray-400">
                  {truncateText(user.email, 20)}
                </p>
              </div>
            </div>

            {/* Right side: logout button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-red-600 hover:text-white"
              // onClick={handleLogout} // 🔹 connect to your logout function
            >
              <LogOut size={20} />
            </Button>
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
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden absolute top-4 left-4">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-[#090b0b] text-white p-0 w-64 sm:w-72"
        >
          <div className="flex flex-col h-full justify-between">
            <div className="overflow-y-auto">
              {/* Logo */}
              <div className="flex items-center justify-center py-4 border-b border-gray-800">
                <Link to="/">
                  <img src={logo} alt="Logo" className="w-32 sm:w-40" />
                </Link>
              </div>

              {/* Mobile profile (same as desktop) */}
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#1d1f1f] bg-[#131414] border-b border-gray-800">
                {/* Left side: avatar + name */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800">
                    <User size={22} className="text-gray-300" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      {truncateText(user.name, 15)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {truncateText(user.email, 20)}
                    </p>
                  </div>
                </div>

                {/* Right side: logout button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-red-600 hover:text-white"
                  // onClick={handleLogout}
                >
                  <LogOut size={20} />
                </Button>
              </div>

              {/* Mobile nav (same structure as desktop) */}
              <nav className="mt-4 space-y-1 px-2">
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(item.label)}
                      className="flex w-full items-center gap-3 text-left text-white py-2 px-3 rounded-lg hover:bg-gradient-to-r from-[#8ab6ff] via-[#14263c] to-[#090b0b] transition-colors"
                    >
                      <Icon
                        size={22}
                        className="h-9 w-9 p-2 rounded-full"
                        style={{ backgroundColor: item.bg }}
                      />
                      <span className="text-sm sm:text-base">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default DashboardNavbar;
