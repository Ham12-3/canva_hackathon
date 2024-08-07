import { Redis } from "ioredis";
require("dotenv").config();

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("redis connected");

    return process.env.REDIS_URL;
  }

  throw new Error("Redis URL not found");
};

export const redis = new Redis(redisClient());
