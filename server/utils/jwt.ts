require("dotenv").config();

import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";
import { RedisKey } from "ioredis";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// Parse environment variables for token expiration times
const accessTokenExpireMinutes = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "5", // Default to 5 minutes
  10
);
const refreshTokenExpireDays = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "3", // Default to 3 days
  10
);

// Options for cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpireMinutes * 60 * 1000), // Set access token expiry time in minutes
  maxAge: accessTokenExpireMinutes * 60 * 1000, // Max age in milliseconds
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production", // Set secure flag only in production
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpireDays * 24 * 60 * 60 * 1000), // Set refresh token expiry time in days
  maxAge: refreshTokenExpireDays * 24 * 60 * 60 * 1000, // Max age in milliseconds
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production", // Set secure flag only in production
};

// Function to send tokens to the client
export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  // Generate access and refresh tokens
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // Upload user session to Redis with expiry time matching refresh token
  redis.set(
    user._id as RedisKey,
    JSON.stringify(user),
    "EX",
    refreshTokenExpireDays * 24 * 60 * 60
  );

  // Set cookies with tokens
  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  // Send response with tokens
  res.status(statusCode).json({
    success: true,
    user,
    access_token: accessToken,
    refresh_token: refreshToken,
  });
};

// Log the token options for debugging purposes
console.log("Access Token Options:", accessTokenOptions);
console.log("Refresh Token Options:", refreshTokenOptions);
