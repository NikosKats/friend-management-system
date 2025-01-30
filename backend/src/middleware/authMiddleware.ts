import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Middleware function to check if the request has a valid JWT token
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the headers (usually 'x-auth-token')
  const token = req.header("x-auth-token");

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey');
    // Attach the decoded userId to the request object
    req.user = decoded.userId;  // You can access this value in the controller
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    // If the token is invalid or expired, deny access
    return res.status(401).json({ error: "Token is not valid" });
  }
};
