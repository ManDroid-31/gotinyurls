import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#0A0A0A] border-b-[1px] border-[#262626] text-white">
      <Link to="/" className="flex items-center gap-2">
        <Link2 className="w-6 h-6" />
        <span className="text-xl font-bold bg-gradient-to-r from-blue-100 to-blue-400 bg-clip-text text-transparent">
          Shortify
        </span>
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="px-4 py-2 bg-white text-black rounded-md">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
