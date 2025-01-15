import express from 'express';
import authController from '../controllers/auth.controller.js';
const router = express.Router();

// User Routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/getUser", authController.getUserById);


export default router;