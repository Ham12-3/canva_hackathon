"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const catchAsyncError_1 = require("./catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const redis_1 = require("../utils/redis");
const user_controller_1 = require("../controllers/user.controller");
exports.isAuthenticated = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        console.log(access_token, "access_token");
        if (!access_token) {
            return next(new ErrorHandler_1.default("Login first to access this resource", 400));
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN);
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                console.log("Access token expired. Trying to refresh...");
                return (0, user_controller_1.updateAccessToken)(req, res, next);
            }
            return next(new ErrorHandler_1.default("Access token is invalid", 400));
        }
        const user = await redis_1.redis.get(decoded.id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found. Please login to access this resource", 404));
        }
        req.user = JSON.parse(user);
        next();
    }
    catch (err) {
        return next(new ErrorHandler_1.default("Authentication failed", 401));
    }
});
