import User from "../models/user.model.js";
import { verifyToken } from "../services/auth.service.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ success: false, error: "Authorization header missing" });
    }
    
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ success: false, error: "Token missing" });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, error: "Forbidden" });
  }
  next();
};
