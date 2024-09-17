import express from "express";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getCourseByUser,
  getCourses,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { isAuthenticated } from "../middleware/auth";
import { authorizeRoles } from "../controllers/user.controller";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getCourses);

courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);

courseRouter.put("/add-question", isAuthenticated, addQuestion);

courseRouter.put("/add-answer", isAuthenticated, addAnswer);

courseRouter.put("/add-review/:id", isAuthenticated, addReview);

courseRouter.put(
  "/add-reply",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  addReplyToReview
);

courseRouter.get(
  "/get-all-courses",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  getAllCourses
);

courseRouter.post("/getVdoCipherOTP", generateVideoUrl);

courseRouter.delete(
  "/delete-course/:id",
  isAuthenticated, // Authentication first
  authorizeRoles("admin"), // Admin authorization second
  deleteCourse
);

export default courseRouter;
