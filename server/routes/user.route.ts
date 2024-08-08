import express from "express";

import {
  activateUser,
  authorizeRoles,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
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
export default userRouter;
