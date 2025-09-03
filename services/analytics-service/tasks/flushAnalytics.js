import { redisConnect } from "shared/config/redis.js";
import UrlAnalytics from "shared/models/UrlAnalytics.js";
import UrlRegionAnalytics from "shared/models/UrlRegionAnalytics.js";
import countries from "world-countries";

import Url from "shared/models/Url.js";

function getCountryCoords(name) {
  const country = countries.find(
    (c) => c.name.common.toLowerCase() === name.toLowerCase()
  );
  if (!country) return null;

  return { lat: country.latlng[0], lng: country.latlng[1] };
}

const redis = redisConnect();

export async function flushAnalytics() {
  const keys = await redis.keys("analytics:*");
  if (keys.length === 0) return;

  for (const key of keys) {
    const parts = key.split(":");
    const isRegionAnalytics = parts[1] === "region";
    const date = isRegionAnalytics ? parts[2] : parts[1]; // YYYY-MM-DD
    const data = await redis.hgetall(key);

    if (!data || Object.keys(data).length === 0) continue;

    if (isRegionAnalytics) {
      const bulkOps = Object.entries(data).map(([field, count]) => {
        const [shortUrl, region] = field.split("|");
        const coords = getCountryCoords(region) || {};
        const lat = coords.lat || 0;
        const lng = coords.lng || 0;

        return {
          updateOne: {
            filter: { shortUrl, date, region },
            update: {
              $inc: { clicks: parseInt(count, 10) },
              $set: { lat, lng },
            },
            upsert: true,
          },
        };
      });

      if (bulkOps.length > 0) {
        await UrlRegionAnalytics.bulkWrite(bulkOps);
        console.log(`✅ Flushed ${bulkOps.length} region entries for ${date}`);
        await redis.del(key);
      }
    } else {
      const bulkOps = Object.entries(data).map(([shortUrl, count]) => ({
        updateOne: {
          filter: { shortUrl, date },
          update: { $inc: { clicks: parseInt(count, 10) } },
          upsert: true,
        },
      }));

      if (bulkOps.length > 0) {
        await UrlAnalytics.bulkWrite(bulkOps);
        console.log(`✅ Flushed ${bulkOps.length} daily entries for ${date}`);
        await redis.del(key);
      }
    }
  }
}
