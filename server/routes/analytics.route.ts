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
  authorizeRoles("admin"), // Admin authorization first
  isAuthenticated, // Authentication second
  getUserAnalytics
);

analyticsRouter.get(
  "/get-courses-analytics",
  authorizeRoles("admin"), // Admin authorization first
  isAuthenticated, // Authentication second
  getCourseAnalytics
);

analyticsRouter.get(
  "/get-orders-analytics",
  authorizeRoles("admin"), // Admin authorization first
  isAuthenticated, // Authentication second
  getOrderAnalytics
);

export default analyticsRouter;
