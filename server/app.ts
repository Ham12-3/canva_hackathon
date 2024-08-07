import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
require("dotenv").config();
export const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser

app.use(cookieParser());

// Use cross origin resource sharing

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// routes

app.use("/api/v1", userRouter);

// Tesing API

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// unkown route handler

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;

  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
