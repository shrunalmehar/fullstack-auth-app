import express from "express";
import Contact from "../models/Contact.js";  // ✅ import model

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();  // ✅ save in MongoDB
    res.json({ success: true, message: "Message saved to database 💌" });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export { router as contactRoutes };
