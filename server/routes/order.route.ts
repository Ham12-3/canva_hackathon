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

  isAuthenticated,
  createOrder
);

// get all orders

orderRouter.get(
  "/get-all-orders",

  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", isAuthenticated, newPayment);

export default orderRouter;
