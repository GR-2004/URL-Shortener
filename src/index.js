import express from "express";
import urlRoute from "./routes/url.route.js";
import rateLimit from "express-rate-limit"
const app = express();
const PORT = 3000;

// Basic rate limiter: 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests, please try again later.",
});

// Apply the rate limiter to all requests
app.use(limiter);
app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
