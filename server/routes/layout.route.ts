import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { authorizeRoles } from "../controllers/user.controller";
import { createLayout, editLayout } from "../controllers/layout.controller";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);
layoutRouter.post(
  "/edit-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout
);

export default layoutRouter;
