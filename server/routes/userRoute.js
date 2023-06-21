import express from "express";

const router = express.Router();

// controllers
import { register, login } from "../controllers/userController.js";

router.post("/register", register);
router.post("/login", login);

export default router;
