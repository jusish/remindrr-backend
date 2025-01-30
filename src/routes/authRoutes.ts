import { Router } from "express";
import * as authController from "../controllers/authController";


const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refreshAccessToken", authController.refreshAccessToken);


export default router;