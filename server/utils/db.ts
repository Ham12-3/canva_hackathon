import mongoose from "mongoose";

require("dotenv").config();

const dbUrl = process.env.DB_URI as string;

export const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl, {}).then((data: any) => {
      console.log(`Database connected to ${data.connection.host}`);
    });

    console.log("Database connected");
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDb, 5000);
  }
};
