import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  createOrder,
  getAllOrders,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/order.controller";
import { authorizeRoles } from "../controllers/user.controller";

const orderRouter = express.Router();

orderRouter.post(
  "/create-order",
  isAuthenticated, // Authentication first
  createOrder
);

// Get all orders
orderRouter.get(
  "/get-all-orders",
  authorizeRoles("admin"), // Admin authorization first
  isAuthenticated, // Authentication second
  getAllOrders
);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post(
  "/payment",
  isAuthenticated, // Authentication first
  newPayment
);

export default orderRouter;
