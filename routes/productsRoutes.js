import express from "express";
import { authJWT, adminAuth } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getNewProducts,
  getHighRatedProducts,
} from "../controllers/ProductsController/productController.js";
import { editPricing } from "../controllers/PricingController/pricingController.js";
import { upload } from "../upload.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct);
router.delete("/:id/", [authJWT, adminAuth], deleteProduct);

router.put("/pricing/", editPricing);

router.get("/new/", getNewProducts);

router.get("/hot/", getHighRatedProducts);

export default router;
