"use client";
import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const regionCoords = {
  India: { lat: 20.5937, lng: 78.9629 },
  Us: { lat: 37.0902, lng: -95.7129 },
  Unknown: { lat: 0, lng: 0 },
};

const data = [
  { clicks: 22, region: "India" },
  { clicks: 5, region: "Us" },
  { clicks: 4, region: "Unknown" },
];

export default function WorldGlobe({ points }) {
  const globeEl = useRef();
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Map your data to lat/lng/size
  //   const points = data.map((d) => ({
  //     lat: regionCoords[d.region].lat,
  //     lng: regionCoords[d.region].lng,
  //     size: d.clicks,
  //     region: d.region,
  //   }));

  // Resize observer for responsiveness
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Auto rotate
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[250px] sm:h-[350px] lg:h-[500px] overflow-hidden rounded-xl"
    >
      {size.width > 0 && (
        <Globe
          ref={globeEl}
          width={size.width}
          height={size.height}
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
          pointsData={points}
          pointAltitude={(d) => d.size * 0.01} // height based on clicks
          pointColor={() => "orange"}
          pointRadius={0.5}
          pointLabel={(d) => `${d.region}: ${d.size} clicks`}
        />
      )}
    </div>
  );
}
