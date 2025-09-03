import dotenv from "dotenv";
dotenv.config();

import { exec } from "child_process";

const filePath = "ipinfo_lite.mmdb";
const url = `https://ipinfo.io/data/ipinfo_lite.mmdb?token=${process.env.IP_INFO}`;

export const downloadDB = () => {
  exec(`curl -L "${url}" -o ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
      return;
    }
    console.log("✅ Download completed:", filePath);
  });
};
