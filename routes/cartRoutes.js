import express from "express";

import {
  createCart,
  getCarts,
} from "../controllers/CartController/cartController.js";
import { authJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authJWT, createCart);
router.get("/", authJWT, getCarts);
export default router;
