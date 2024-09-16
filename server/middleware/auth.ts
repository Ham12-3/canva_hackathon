import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { updateAccessToken } from "../controllers/user.controller"; // Import your token refresh logic

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Correctly access the access_token from req.cookies
      const access_token = req.cookies.access_token;

      console.log(access_token, "access_token");

      if (!access_token) {
        return next(
          new ErrorHandler("Login first to access this resource", 400)
        );
      }

      // Verify the access token synchronously
      let decoded: JwtPayload;

      try {
        decoded = jwt.verify(
          access_token,
          process.env.ACCESS_TOKEN as string
        ) as JwtPayload;
      } catch (err) {
        // Handle token expiration
        if (err instanceof TokenExpiredError) {
          console.log("Access token expired. Trying to refresh...");

          // Call the updateAccessToken function to refresh tokens
          return updateAccessToken(req, res, next); // This should update the tokens and call next()
        }

        // Handle other token verification errors
        return next(new ErrorHandler("Access token is invalid", 400));
      }

      // Check if user exists in Redis cache (session storage)
      const user = await redis.get(decoded.id);

      if (!user) {
        return next(
          new ErrorHandler(
            "User not found. Please login to access this resource",
            404
          )
        );
      }

      // Attach user information to request
      req.user = JSON.parse(user);

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      return next(new ErrorHandler("Authentication failed", 401));
    }
  }
);
