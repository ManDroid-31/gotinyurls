import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "@/store/userSlice";
import { useState } from "react";
import { Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [urls, setUrls] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#0A0A0A] border-b-[1px] border-[#262626] text-white">
      <Link to="/" className="flex items-center gap-2">
        <Link2 className="w-6 h-6" />
        <span className="text-xl font-bold bg-gradient-to-r from-blue-100 to-blue-400 bg-clip-text text-transparent">
          Shortify
        </span>
      </Link>
      <div className="flex gap-4 items-center">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
