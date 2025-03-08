import express from "express";
import { authJWT, adminAuth } from "../middlewares/authMiddleware.js";
import { getStatistics } from "../controllers/StatisticsController/statisticsController.js";

const router = express.Router();

router.get("/", getStatistics);

export default router;
