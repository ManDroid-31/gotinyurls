import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardStats from "@/components/DashboardStats";
import { Scissors, CheckCheck, Copy } from "lucide-react";
import AnalyticsChart from "@/components/AnalyticsChart";
import toast from "react-hot-toast";
import Url from "@/components/Url";
// import UrlTable from "../components/UrlTable.jsx";
import { useDispatch } from "react-redux";
import { setUrls } from "@/store/urlsSlice";
import { addUrl } from "@/store/urlsSlice";

const Dashboard = () => {
  const { email, token, name } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserUrls = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/url/user-urls",
          {
            params: { email: localStorage.getItem("email") }, // ✅
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        dispatch(setUrls(res.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserUrls();
  }, [dispatch]);

  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortened, setShortened] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/url/shorten",
        { originalUrl: longUrl, alias, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setShortened(res.data);
      dispatch(addUrl(res.data));
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-screen">
      <DashboardNavbar />
      <div className="bg-[#0a0a0a] text-white p-6 space-y-6 h-">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Welcome back, {name || "User"}!
          </h1>
          <div className="text-gray-400">{email || "John Doe"}</div>
        </div>
        <p className="text-gray-400">
          Manage your shortened URLs and track their performance
        </p>

        {/* <DashboardStats /> */}

        {/* Shorten URL Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="max-w-md p-6 bg-[#131320] rounded-xl flex flex-col space-y-4">
            {/* Title */}
            <h2 className="text-white text-lg font-semibold flex items-center space-x-2">
              <Scissors className="h-5 w-5" />
              <span>Shorten URL</span>
            </h2>

            {/* Success / Error Message */}
            {shortened && (
              <div className="flex justify-between items-center border border-green-500 p-4 rounded-md bg-[#131320]">
                <div className="flex items-start gap-2 ">
                  <CheckCheck className="h-5 w-5 text-green-400" />
                  <div className="text-[#BBF7D0]">
                    <p>URL shortened successfully!</p>
                    <p className="text-[#93cca7]">
                      {`${import.meta.env.VITE_BACKEND_URL}/${
                        shortened.shortUrl
                      }`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigator.clipboard
                      .writeText(
                        `${import.meta.env.VITE_BACKEND_URL}/${
                          shortened.shortUrl
                        }`
                      )
                      .then(() => {
                        toast.success("Shortened URL copied to clipboard!");
                      })
                  }
                  className="p-2 rounded-md border border-gray-600 bg-black text-white hover:text-[#BBF7D0]"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {/* Long URL Input */}
            <div className="flex flex-col space-y-1">
              <label className="text-gray-300 text-sm font-medium">
                Long URL
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  🔗
                </span>
                <input
                  type="url"
                  placeholder="https://example.com/very-long-url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-[#1a1a2b] text-white border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Custom Alias Input */}
            <div className="flex flex-col space-y-1">
              <label className="text-gray-300 text-sm font-medium">
                Custom Alias (optional)
              </label>
              <input
                type="text"
                placeholder="my-custom-link"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="w-full px-3 py-2 bg-[#1a1a2b] text-white border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-gray-500 text-xs">
                Leave empty for auto-generated alias
              </span>
            </div>

            {/* Button */}
            <button
              onClick={handleShorten}
              disabled={loading}
              className="mt-2 w-full py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-md flex items-center justify-center space-x-2 hover:opacity-90 transition"
            >
              <Scissors className="h-5 w-5" />
              <span>{loading ? "Shortening..." : "Shorten URL"}</span>
            </button>
          </div>

          {/* 7-Day Analytics Chart */}

          <div className="bg-[#0A0A0A] rounded-lg flex items-center md:col-span-2 justify-center md:min-h-[100%]">
            <AnalyticsChart />
          </div>
        </div>
        {/* <UrlTable /> */}

        <UrlTable />
      </div>
    </div>
  );
};

export default Dashboard;
