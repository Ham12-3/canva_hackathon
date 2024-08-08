import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

require("dotenv").config();

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust this type based on your user model
    }
  }
}

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // Correctly access the access_token from req.cookies
    const access_token = req.cookies.access_token;

    console.log("Cookies:", req); // Log cookies for debugging
    console.log("Access token:", access_token); // Log access token for debugging

    if (!access_token) {
      return next(new ErrorHandler("Login first to access this resource", 400));
    }

    try {
      const decoded = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN as string
      ) as JwtPayload;

      if (!decoded) {
        return next(
          new ErrorHandler("Login first to access this resource", 400)
        );
      }

      const user = await redis.get(decoded.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      req.user = JSON.parse(user);
      console.log("Authenticated user:", req.user); // Add this line for debugging

      next();
    } catch (error) {
      console.error("Authentication error:", error); // Log the error for debugging
      return next(new ErrorHandler("Invalid token", 400));
    }
  }
);
