import express from "express";
import { authorizeRoles } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";
import { getNotifications } from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get/all/notifications",
  authorizeRoles("admin"),
  isAuthenticated,
  getNotifications
);

export default notificationRouter;
