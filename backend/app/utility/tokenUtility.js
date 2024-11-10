import {JWT_EXPIRATION_TIME, JWT_SECRET} from "../config/config.js";
import jwt from "jsonwebtoken";

export const EncodeToken = (email, user_id) => {
    const KEY = JWT_SECRET;
    const EXPIRE = { expiresIn: JWT_EXPIRATION_TIME };
    const PAYLOAD = { email: email, user_id: user_id };
    return jwt.sign(PAYLOAD,KEY,EXPIRE)
}

export const DecodeToken = (token) => {
    try {
      // Verify and decode the token
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error("Token verification failed:", error);
      return null; // Return null if token is invalid or expired
    }
  };