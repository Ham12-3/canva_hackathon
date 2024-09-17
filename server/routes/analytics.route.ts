import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  getCourseAnalytics,
  getOrderAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";
import { authorizeRoles } from "../controllers/user.controller";

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  getUserAnalytics
);

analyticsRouter.get(
  "/get-courses-analytics",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  getCourseAnalytics
);

analyticsRouter.get(
  "/get-orders-analytics",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  getOrderAnalytics
);

export default analyticsRouter;
