import maxmind from "maxmind";
const filePath = "ipinfo_lite.mmdb";
const url = `https://ipinfo.io/data/ipinfo_lite.mmdb?token=${process.env.IP_INFO}`;
import dotenv from "dotenv";
dotenv.config();

export const getLocation = async (ip) => {
  try {
    const lookup = await maxmind.open(filePath);
    const geo = lookup.get(ip);

    if (geo) {
      return geo?.country;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};
