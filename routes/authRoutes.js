import express from "express";
import {
  createUser,
  loginUser,
  getDashboard,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/create-user", createUser);
router.post("/login", loginUser);
router.get("/dashboard", protect, getDashboard);

export default router;


