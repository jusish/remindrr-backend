import express from 'express';
import { Router } from 'express';
import protect from '../middlewares/authMiddleware';
import { register, login, getProfile } from '../controllers/authController';


const router: Router = express.Router();

router.post('/register', register)
router.post('/login', login)


router.get('/profile', protect, getProfile)

export default router;