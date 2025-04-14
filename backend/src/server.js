import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import db from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;
// Enable CORS
const corsOptions = {
  origin:
    process.env.NODE_ENV === "development" ? "http://localhost:5173" : "*", // Allow localhost:5173 in dev
  credentials: true, // Allow cookies to be sent across different origins
};

app.use(cors(corsOptions)); // Use CORS middleware

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
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
