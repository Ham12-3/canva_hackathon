import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  authorizeRoles,
  updateAccessToken,
} from "../controllers/user.controller";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);
layoutRouter.post(
  "/edit-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout
);

layoutRouter.get(
  "/get-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getLayoutByType
);

export default layoutRouter;
