"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.refreshTokenOptions = exports.accessTokenOptions = void 0;
require("dotenv").config();
const redis_1 = require("./redis");
const accessTokenExpireMinutes = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "5", 10);
const refreshTokenExpireDays = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "3", 10);
const isProduction = process.env.NODE_ENV === "production";
exports.accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpireMinutes * 60 * 1000),
    maxAge: accessTokenExpireMinutes * 60 * 1000,
    httpOnly: isProduction,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
};
exports.refreshTokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpireDays * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpireDays * 24 * 60 * 60 * 1000,
    httpOnly: isProduction,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
};
const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    redis_1.redis.set(user._id, JSON.stringify(user), "EX", refreshTokenExpireDays * 24 * 60 * 60);
    res.cookie("access_token", accessToken, exports.accessTokenOptions);
    res.cookie("refresh_token", refreshToken, exports.refreshTokenOptions);
    res.status(statusCode).json({
        success: true,
        user,
        access_token: accessToken,
        refresh_token: refreshToken,
    });
};
exports.sendToken = sendToken;
console.log("Access Token Options:", exports.accessTokenOptions);
console.log("Refresh Token Options:", exports.refreshTokenOptions);
