import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongoDb id error

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //   Wrong jwt token error

  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try Again!!!";
    err = new ErrorHandler(message, 400);
  }

  // JWt expired error

  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired. Try Again!!!";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
