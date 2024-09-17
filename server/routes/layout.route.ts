import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";
import { authorizeRoles } from "../controllers/user.controller";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  createLayout
);

layoutRouter.put(
  "/edit-layout",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  editLayout
);

layoutRouter.get("/get-layout/:type", getLayoutByType);

export default layoutRouter;
