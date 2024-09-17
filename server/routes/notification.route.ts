import express from "express";
import { authorizeRoles } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  getNotifications
);

notificationRouter.put(
  "/update-notification/:id",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  updateNotification
);

export default notificationRouter;
