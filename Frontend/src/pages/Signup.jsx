import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/signup", 
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Signup successful:", res.data);
      setMessage("Signup successful ✅");

      // Store token if returned
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong ❌");
    }
  };

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
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Full Name</label>
              <div className="flex items-center border border-gray-700 rounded-lg px-3">
                <span className="text-gray-500">👤</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Omkar Ghodekar"
                  className="w-full px-2 py-2 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
                  required
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="omkar@example.com"
                  className="w-full px-2 py-2 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full px-2 py-2 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
                  required
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full px-2 py-2 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
                  required
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

          {message && (
            <p className="text-center mt-4 text-sm text-red-400">{message}</p>
          )}

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
