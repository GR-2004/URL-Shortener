import { nanoid } from "nanoid";
import Redis from "ioredis";
import { isValidUrl } from "../utils/verifyURL.util.js";
import { isValidAlias } from "../utils/verifyAlias.util.js";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});

const BASE_URL = "http://localhost:3000";

// Generate new short URL
export const generateNewShortURL = async (req, res) => {
  try {
    const { url, customAlias } = req.body;

    if (!url) {
      return res.status(401).json({ message: "URL is required" });
    }

    if (!isValidUrl(url)) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    let shortID;

    if (customAlias) {
      if (!isValidAlias(customAlias)) {
        return res.status(400).json({
          message: "Alias must be 1-15 characters long and can only contain letters, numbers, hyphens, and underscores.",
        });
      }
      shortID = customAlias;
    } else {
      shortID = nanoid(8);
    }

    const existingURL = await redis.get(shortID);
    if (existingURL) {
      return res.status(400).json({ message: "Alias is already taken. Choose another one." });
    }

    const urlData = {
      redirectURL: url,
      visitHistory: [],
    };

    await redis.set(shortID, JSON.stringify(urlData), 'EX', 172800); // automatically expire after 2 days

    const fullShortURL = `${BASE_URL}/url/${shortID}`;

    return res.status(201).json({
      message: "Short URL generated successfully",
      shortURL: fullShortURL,
      id: shortID,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

// Redirect to the original URL
export const redirectShortURL = async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    if (!shortUrl) {
      return res.status(400).json({ message: "shortUrl is required" });
    }

    const response = await redis.get(shortUrl);
    if (!response) {
      return res.status(404).json({ message: "URL not found" });
    }

    const urlData = JSON.parse(response);
    urlData.visitHistory.push({ timeStamp: Date.now() }); // Update visit history

    await redis.set(shortUrl, JSON.stringify(urlData));

    return res.redirect(urlData.redirectURL);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while redirecting to original URL",
      error,
    });
  }
};

// Get analytics for a short URL
export const getAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortUrl;
    const result = await redis.get(shortId);
    if (!result) {
      return res.status(404).json({ message: "shortId not found" });
    }

    const urlData = JSON.parse(result); 
    return res.status(200).json({
      totalClicks: urlData.visitHistory.length,
      analytics: urlData.visitHistory,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
