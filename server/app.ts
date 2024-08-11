import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
require("dotenv").config();

export const app = express();

// Body parser middleware
app.use(express.json({ limit: "50mb" }));

// Cookie parser middleware
app.use(cookieParser());

// CORS configuration to allow credentials
app.use(
  cors({
    origin: process.env.ORIGIN, // Ensure this is correctly set
    credentials: true, // Allow cookies and other credentials
  })
);

// Routes
app.use("/api/v1", userRouter, courseRouter, orderRouter, notificationRouter);

// Testing API endpoint
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// Unknown route handler (404)
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Error handling middleware
app.use(ErrorMiddleware);
