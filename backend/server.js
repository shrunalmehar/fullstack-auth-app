import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // if you already have
import { contactRoutes } from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

// ✅ Allow frontend (Vite) to connect
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Example route (you can replace later)
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Existing routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.use("/api/contact", contactRoutes);
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});
