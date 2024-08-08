import express from "express";

import {
  activateUser,
  authorizeRoles,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updatePassword,
  updateUserInfo,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

import { updateAccessToken } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, authorizeRoles("admin"), logoutUser);

userRouter.get("/refreshtoken", updateAccessToken);

userRouter.get("/me", isAuthenticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

userRouter.put("/update-user-password", isAuthenticated, updatePassword);
export default userRouter;
