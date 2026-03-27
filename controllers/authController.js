import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const hashed = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Utkarsh",
      email: "test@gmail.com",
      password: hashed,
    });

    res.send("User created");
  } catch (err) {
    res.status(500).json({ message: "User creation failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ use env here
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const getDashboard = (req, res) => {
  res.json({
    user: req.user,
    data: {
      leads: ["Lead 1", "Lead 2"],
      tasks: ["Task 1", "Task 2"],
      users: ["User A", "User B"],
    },
  });
};