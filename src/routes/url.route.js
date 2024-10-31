import express from "express"
import { generateNewShortURL, getAnalytics, redirectShortURL } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/shorten", generateNewShortURL);

router.get("/:shortUrl", redirectShortURL);

router.get("/stats/:shortUrl", getAnalytics)

export default router