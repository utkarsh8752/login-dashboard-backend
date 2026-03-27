import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // load env

const app = express();
app.use(express.json());
app.use(cors());

// connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes);

// port from env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});