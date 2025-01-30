import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthRequest from "../interfaces/authRequest";

const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401).json({ message: "No token provided" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || "", (err, user) => {
    if (err) return res.sendStatus(403).json({ message: "Invalid token" });

    req.user = user;

    next();
  });
};

export default authenticateToken;
