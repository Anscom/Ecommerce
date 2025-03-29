import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unathorized - No access token provided" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (e) {
      if (e.name == "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unathorized - Access Token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", e.message);
    return res
      .status(401)
      .json({ message: "Unathorized - Invalid Access token" });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied - Admin only" });
  }
};
