import Redis, { RedisOptions } from "ioredis";
require("dotenv").config();

const redisClient = () => {
  const redisHost = process.env.REDIS_HOST;
  const redisPort = parseInt(process.env.REDIS_PORT || "", 10);
  const redisPassword = process.env.REDIS_PASSWORD;

  // Constructing the configuration object
  const redisConfig: RedisOptions = {
    host: redisHost,
    port: redisPort,
    password: redisPassword,
    tls: {}, // Enabling TLS/SSL
  };

  // Check if the host, port, and password are available
  if (redisConfig.host && redisConfig.port && redisConfig.password) {
    console.log("Connecting to Redis...");
    return new Redis(redisConfig); // Return a new Redis instance
  }

  throw new Error("Redis connection details are missing");
};

export const redis = redisClient(); // Export the initialized Redis client
