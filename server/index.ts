import { app } from "./app";

import { connectDb } from "./utils/db";
import http from "http";

require("dotenv").config();
import { v2 as cloudinary } from "cloudinary";

// cloudinary config

const server = http.createServer(app);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Create server
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  connectDb();
});
