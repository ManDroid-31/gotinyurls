import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const QRPopup = ({ url, onClose }) => {
  const canvasRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;

    image.onload = () => {
      const width = 400;
      const height = 500; // rectangle shape
      canvas.width = width;
      canvas.height = height;

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Draw QR code in center
      const qrSize = 300;
      ctx.drawImage(image, (width - qrSize) / 2, 50, qrSize, qrSize);

      // Draw website name below QR code
      ctx.fillStyle = "#000000";
      ctx.font = "22px 'Arial', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("GoTinyUrls.netlify.com", width / 2, qrSize + 100);

      ctx.font = "16px 'Arial', sans-serif";
      ctx.fillText("Scan this QR to open your link", width / 2, qrSize + 130);

      setLoaded(true);
    };
  }, [url]);

  const handleDownload = (e) => {
    e.preventDefault();

    if (!loaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const imgData = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "GoTinyUrls_QR.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.23)]">
      <div className="bg-[#1b1b1b] p-6 rounded-xl flex flex-col items-center gap-4 shadow-xl">
        <h3 className="text-white text-xl font-semibold">
          Your GoTinyUrls QR Code
        </h3>
        <canvas ref={canvasRef} className="rounded-lg shadow-lg" />
        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleDownload}
            disabled={!loaded}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Download JPG
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRPopup;
