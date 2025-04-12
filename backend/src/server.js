import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import db from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

// Start server only after DB is connected
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
    process.exit(1);
  }

  console.log("✅ MySQL connected");

  const PORT = process.env.PORT || 5004;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
