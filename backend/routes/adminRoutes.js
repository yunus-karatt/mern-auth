import express from "express";
import {
  authAdmin,
  getUserData,
  logout,
  registerAdmin,
  updateUserAccess,
  deleteUser,
  updateUserData,
  getUserToUpdate
} from "../controllers/adminController.js";
import { protectAdminRoutes } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/", authAdmin);
router.post("/logout", logout);

router.get("/dashboard", protectAdminRoutes, getUserData);
router.get('/update-user-data/:id',protectAdminRoutes,getUserToUpdate)

router.put("/user/block-unblock",protectAdminRoutes,updateUserAccess)
router.put("/user/update-user",protectAdminRoutes,updateUserData)

router.delete("/user/delete",protectAdminRoutes,deleteUser)
export default router;
