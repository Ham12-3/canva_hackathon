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

  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics
);

analyticsRouter.get(
  "/get-courses-analytics",

  isAuthenticated,
  authorizeRoles("admin"),
  getCourseAnalytics
);

analyticsRouter.get(
  "/get-orders-analytics",

  isAuthenticated,
  authorizeRoles("admin"),
  getOrderAnalytics
);
export default analyticsRouter;
