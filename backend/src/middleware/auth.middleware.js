import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import db from "../lib/db.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unathorized - No access token provided" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const [rows] = await db
        .promise()
        .query("SELECT id, name, email, role FROM users WHERE id = ?", [
          decoded.userId,
        ]);

      if (rows.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = rows[0];
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unathorized - Access token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in protectroute middleware", error.message);
    return res
      .status(401)
      .json({ message: "Unathorized - Invalid access token" });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied - Admin only" });
  }
};
