import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  google,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/multer.js";
import multer from "multer";

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router.post('/google',google)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect,upload.single("file") ,updateUserProfile);

export default router;
