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
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
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
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  getAllUsers
);

userRouter.put(
  "/update-user",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  deleteUser
);

export default userRouter;
