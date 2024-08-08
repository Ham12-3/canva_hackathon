import express from "express";
import { uploadCourse } from "../controllers/course.controller";
import { isAuthenticated } from "../middleware/auth";
import { authorizeRoles } from "../controllers/user.controller";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

export default courseRouter;
