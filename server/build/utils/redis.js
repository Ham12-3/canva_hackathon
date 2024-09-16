"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
require("dotenv").config();
const redisClient = () => {
    const redisHost = process.env.REDIS_HOST;
    const redisPort = parseInt(process.env.REDIS_PORT || "", 10);
    const redisPassword = process.env.REDIS_PASSWORD;
    // Constructing the configuration object
    const redisConfig = {
        host: redisHost,
        port: redisPort,
        password: redisPassword,
        tls: {}, // Enabling TLS/SSL
    };
    // Check if the host, port, and password are available
    if (redisConfig.host && redisConfig.port && redisConfig.password) {
        console.log("Connecting to Redis...");
        return new ioredis_1.default(redisConfig); // Return a new Redis instance
    }
    throw new Error("Redis connection details are missing");
};
exports.redis = redisClient(); // Export the initialized Redis client
