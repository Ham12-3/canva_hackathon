import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { getUserAnalytics } from "../controllers/analytics.controller";
import { authorizeRoles } from "../controllers/user.controller";

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics
);

export default analyticsRouter;
