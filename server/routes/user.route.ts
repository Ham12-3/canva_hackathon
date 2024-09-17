import express from "express";

import {
  activateUser,
  authorizeRoles,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

import { updateAccessToken } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get(
  "/logout",
  authorizeRoles("admin"), // Admin authorization first
  isAuthenticated, // Authentication second
  logoutUser
);

userRouter.get("/refreshtoken", updateAccessToken);

userRouter.get(
  "/me",
  isAuthenticated, // Authentication first
  getUserInfo
);

userRouter.post("/social-auth", socialAuth);

userRouter.put(
  "/update-user-info",
  isAuthenticated, // Authentication first
  updateUserInfo
);

userRouter.put(
  "/update-user-password",
  isAuthenticated, // Authentication first
  updatePassword
);

userRouter.put(
  "/update-user-avatar",
  isAuthenticated, // Authentication first
  updateProfilePicture
);

userRouter.get(
  "/get-all-users",
  authorizeRoles("admin"), // Admin authorization first
  isAuthenticated, // Authentication second
  getAllUsers
);

userRouter.put(
  "/update-user",
  authorizeRoles("admin"), // Admin authorization first
  isAuthenticated, // Authentication second
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",
  authorizeRoles("admin"), // Admin authorization first
  isAuthenticated, // Authentication second
  deleteUser
);

export default userRouter;
