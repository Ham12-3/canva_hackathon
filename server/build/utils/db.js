"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const dbUrl = process.env.DB_URI;
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(dbUrl, {}).then((data) => {
            console.log(`Database connected to ${data.connection.host}`);
        });
        console.log("Database connected");
    }
    catch (error) {
        console.log(error.message);
        setTimeout(exports.connectDb, 5000);
    }
};
exports.connectDb = connectDb;
