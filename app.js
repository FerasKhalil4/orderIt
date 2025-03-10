import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/authRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import productRouter from "./routes/productsRoutes.js";
import rateRouter from "./routes/rateRoutes.js";
import statisticsRouter from "./routes/statisticsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsPath = path.join(__dirname, "public/uploads/images");

// Serve static files
app.use("/uploads", express.static(uploadsPath));

// Middleware
app.use(
  cors({
    origin:
      "https://orderit-client-5chct7sru-feraskhalil4s-projects.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/rate", rateRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/api/user", userRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(err.stack);
});

export default app;
