import express from "express";
import {
  rateProduct,
  editRating,
  getProductRating,
} from "../controllers/RateController/rateController.js";
import { authJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:productId/", authJWT, rateProduct);
router.put("/:productId/", authJWT, editRating);

router.get("/:productId/", authJWT, getProductRating);

export default router;
