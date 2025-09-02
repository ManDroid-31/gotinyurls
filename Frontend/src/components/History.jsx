import toast from "react-hot-toast";
import React from "react";
import { CalendarDays, Lock, Dot } from "lucide-react";
import { Copy, QrCode, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import useGetUrls from "@/hooks/useGetUrls";
import { useSelector } from "react-redux";
import QRPopup from "./QRPopup";

// Mock data based on your MongoDB entry

const History = () => {
  const { urls } = useSelector((state) => state.urls);
  const { getUrl, loading, error } = useGetUrls();
  const [qrPopupOpen, setQrPopupOpen] = useState(false);
  useEffect(() => {
    getUrl();
  }, [getUrl]);

  return (
    <div className="flex flex-col rounded-lg gap-5">
      <h3 className="text-2xl lg:text-3xl text-[#dbdbda] font-medium">
        History
      </h3>
      <div className="flex flex-col gap-4">
        {urls.map((item) => (
          <div
            key={item.id}
            className="flex flex-col lg:flex-row justify-between bg-[#1b1a1a] p-4 rounded-lg gap-4"
          >
            <div className="flex gap-4 items-center">
              <div className="flex flex-col text-[#dbdbda]">
                <span className="font-medium text-lg">{item.title}</span>
                <a
                  href={import.meta.env.VITE_BACKEND_URL + "/" + item.shortUrl}
                  className="text-blue-400"
                  target="/"
                >
                  {import.meta.env.VITE_BACKEND_URL + "/" + item.shortUrl}
                </a>
                <span className="text-gray-400 text-sm">
                  {item.originalUrl}
                </span>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-gray-300 text-sm px-2 py-1 bg-[#2a2a2a] rounded-full flex items-center gap-1">
                    <CalendarDays className="text-[#4b79be]" size={14} />{" "}
                    {new Date(item.expiresAt).toISOString().split("T")[0]}
                  </span>
                  {item.password && (
                    <span className="text-gray-300 text-sm px-2 py-1 bg-[#2a2a2a] rounded-full flex items-center gap-1">
                      <Lock className="text-[#4b79be]" size={14} /> Protected
                    </span>
                  )}
                  <span
                    className={`text-sm px-2 py-1 rounded-full flex items-center gap-1 ${
                      new Date(item.expiresAt) > Date.now()
                        ? "text-green-400 bg-[#2a2a2a]"
                        : "text-red-400 bg-[#2a2a2a]"
                    }`}
                  >
                    ⬤{" "}
                    {new Date(item.expiresAt) > Date.now()
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-col flex justify-start gap-4">
              <button className="text-gray-400 hover:text-white">
                <Trash className="h-4 w-4" />
              </button>
              <button
                className="text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard
                    .writeText(
                      `${import.meta.env.VITE_BACKEND_URL}/${item.shortUrl}`
                    )
                    .then(() => {
                      toast.success("Shortened URL copied to clipboard!");
                    });
                }}
              >
                <Copy className="h-4 w-4" />
              </button>
              {item.qrCode && (
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setQrPopupOpen(true);
                  }}
                >
                  <QrCode className="h-4 w-4" />
                </button>
              )}
              {/* {item.qrCode && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setQrPopupOpen(true);
                  }}
                  className="p-2 rounded-md border border-gray-600 bg-black text-white hover:text-[#BBF7D0]"
                >
                  <QrCode className="h-5 w-5" />
                </button>
              )} */}

              {qrPopupOpen && (
                <QRPopup
                  url={item.qrCode}
                  onClose={() => setQrPopupOpen(false)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
