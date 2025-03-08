import express from "express";
import {
  login,
  logout,
  accessTokenRefresh,
} from "../controllers/AuthControllers/authController.js";

const router = express.Router();

router.post("/login/", login);
router.post("/logout/", logout);
router.post("/token/", accessTokenRefresh);

export default router;
