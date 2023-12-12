import express from "express";
import {
  authAdmin,
  getUserData,
  logout,
  registerAdmin,
} from "../controllers/adminController.js";
import { protectAdminRoutes } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/", authAdmin);
router.post("/logout", logout);
router.get("/dashboard", protectAdminRoutes, getUserData);

export default router;
