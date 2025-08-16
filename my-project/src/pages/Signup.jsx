import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f172a] to-[#0a0f1e]">
      {/* Navbar */}
      <Navbar />

      {/* Signup Card */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-[#070d1a] text-white rounded-2xl shadow-lg w-full max-w-md p-8">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-blue-400">
            Create Account
          </h2>
          <p className="text-gray-400 text-center mt-2">
            Join thousands of users shortening links with Shortify
          </p>

          {/* Form */}
          <form className="mt-8 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Full Name</label>
              <div className="flex items-center border border-gray-700 rounded-lg px-3">
                <span className="text-gray-500">👤</span>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-2 py-2 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <div className="flex items-center border border-gray-700 rounded-lg px-3">
                <span className="text-gray-500">📧</span>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-2 py-2 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
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
                  placeholder="Create a password"
                  className="w-full px-2 py-2 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Confirm Password</label>
              <div className="flex items-center border border-gray-700 rounded-lg px-3">
                <span className="text-gray-500">🔒</span>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-2 py-2 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 hover:opacity-90 transition"
            >
              Create Account
            </button>
          </form>

          {/* Already have account */}
          <p className="text-gray-400 text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
