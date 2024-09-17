import express from "express";
import {
  authorizeRoles,
  updateAccessToken,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",

  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);

notificationRouter.put(
  "/update-notification/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRouter;
