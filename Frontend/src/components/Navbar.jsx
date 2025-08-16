import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-xl font-bold">🔗 Shortify</span>
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/signup" className="px-4 py-2 bg-white text-black rounded-md">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
