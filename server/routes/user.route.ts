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

  isAuthenticated,
  authorizeRoles("admin"),
  logoutUser
);

userRouter.get(
  "/refreshtoken",

  updateAccessToken
);

userRouter.get("/me", isAuthenticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put(
  "/update-user-info",

  isAuthenticated,
  updateUserInfo
);

userRouter.put(
  "/update-user-password",

  isAuthenticated,
  updatePassword
);

userRouter.put(
  "/update-user-avatar",

  isAuthenticated,
  updateProfilePicture
);

userRouter.get(
  "/get-all-users",

  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
userRouter.put(
  "/update-user",

  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",

  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
