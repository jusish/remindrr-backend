import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthRequest from "../interfaces/authRequest";

const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const user = (await jwt.verify(token, process.env.JWT_SECRET || "")) as {
      id: string;
    };
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};

export default authenticateToken;
