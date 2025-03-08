import express from "express";
const router = express.Router();
import {
  createUser,
  getUsers,
  deleteUser,
} from "../controllers/UserControllers/userController.js";

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id/", deleteUser);

export default router;
