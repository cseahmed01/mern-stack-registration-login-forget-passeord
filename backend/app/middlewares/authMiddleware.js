// src/app/middlewares/authMiddleware.js
import { DecodeToken } from '../utility/tokenUtility.js';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Decode and verify the token
  const decoded = DecodeToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  // Attach user data to request
  req.user = decoded;
  next();
};

export default authMiddleware;
