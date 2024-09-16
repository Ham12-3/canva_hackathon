"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.refreshTokenOptions = exports.accessTokenOptions = void 0;
require("dotenv").config();
const redis_1 = require("./redis");
// Parse environment variables for token expiration times
const accessTokenExpireMinutes = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "5", // Default to 5 minutes
10);
const refreshTokenExpireDays = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "3", // Default to 3 days
10);
// Options for cookies
exports.accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpireMinutes * 60 * 1000), // Set access token expiry time in minutes
    maxAge: accessTokenExpireMinutes * 60 * 1000, // Max age in milliseconds
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // Set secure flag only in production
};
exports.refreshTokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpireDays * 24 * 60 * 60 * 1000), // Set refresh token expiry time in days
    maxAge: refreshTokenExpireDays * 24 * 60 * 60 * 1000, // Max age in milliseconds
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // Set secure flag only in production
};
// Function to send tokens to the client
const sendToken = (user, statusCode, res) => {
    // Generate access and refresh tokens
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    // Upload user session to Redis with expiry time matching refresh token
    redis_1.redis.set(user._id, JSON.stringify(user), "EX", refreshTokenExpireDays * 24 * 60 * 60);
    // Set cookies with tokens
    res.cookie("access_token", accessToken, exports.accessTokenOptions);
    res.cookie("refresh_token", refreshToken, exports.refreshTokenOptions);
    // Send response with tokens
    res.status(statusCode).json({
        success: true,
        user,
        access_token: accessToken,
        refresh_token: refreshToken,
    });
};
exports.sendToken = sendToken;
// Log the token options for debugging purposes
console.log("Access Token Options:", exports.accessTokenOptions);
console.log("Refresh Token Options:", exports.refreshTokenOptions);
