import { Request, Response, NextFunction } from "express";
import verifyJwtToken from "../utils/jwtUtils";
import User from "../models/User";

interface AuthRequest extends Request {
    user?: any;
}

const protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        const userId = verifyJwtToken(token);
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Get user from token
        const user = await User.findById(userId).select('-password');
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default protect;