import express from "express";

const router = express.Router();

// controllers
import {
  register,
  login,
  currentUser,
  forgottenPassword,
  profileUpdate,
} from "../controllers/userController.js";
import { verifyUser } from "../middlewares/authenticate.js";

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", verifyUser, currentUser);
router.patch("/forgotten-password", forgottenPassword);
router.patch("/profile-update", profileUpdate);

export default router;
