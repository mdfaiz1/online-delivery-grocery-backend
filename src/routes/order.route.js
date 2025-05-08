import { Router } from "express";

const orderRouter = Router();
import {
  placeOrderCOD,
  getUserOrders,
  getAllOrders,
} from "../controller/order.controller.js";
import { verifyUserJWT } from "../middlewares/authUser.middleware.js";
import { verifySellerJWT } from "../middlewares/authSeller.middleware.js";

orderRouter.route("/").post(verifyUserJWT, placeOrderCOD);
orderRouter.route("/").get(verifyUserJWT, getUserOrders);
orderRouter.route("/seller").get(verifySellerJWT, getAllOrders);

export default orderRouter;
