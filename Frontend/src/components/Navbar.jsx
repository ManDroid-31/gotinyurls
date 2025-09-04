import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 py-6 bg-[#0A0A0A] border-b-[1px] border-[#262626] text-white">
      <Link to="/">
        <img src={logo} width={170} alt="" />
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
