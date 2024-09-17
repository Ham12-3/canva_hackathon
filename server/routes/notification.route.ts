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
  authorizeRoles("admin"), // Admin authorization first
  isAuthenticated, // Authentication second
  getNotifications
);

notificationRouter.put(
  "/update-notification/:id",
  authorizeRoles("admin"), // Admin authorization first
  isAuthenticated, // Authentication second
  updateNotification
);

export default notificationRouter;
