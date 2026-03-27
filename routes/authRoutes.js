import express from "express";
import {
  registerUser,
  loginUser,
  getDashboard,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", protect, getDashboard);

export default router;


