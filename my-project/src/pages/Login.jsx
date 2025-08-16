import { useState } from "react";
import Navbar from "../components/Navbar";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f172a] to-[#0a0f1e]">
      {/* Navbar */}
      <Navbar />

      {/* Login Card */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-[#070d1a] text-white rounded-2xl shadow-lg w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center mb-2 text-blue-400">
            Welcome Back
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Sign in to your Shortify account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <div className="flex items-center border border-gray-700 rounded-lg px-3">
                <span className="text-gray-500">📧</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-2 py-2 bg-transparent outline-none text-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <div className="flex items-center border border-gray-700 rounded-lg px-3">
                <span className="text-gray-500">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-2 py-2 bg-transparent outline-none text-sm"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
