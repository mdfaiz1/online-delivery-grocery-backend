import { Router } from "express";
import {
  loginSelller,
  isAuth,
  logoutSeller,
} from "../controller/seller.controller.js";
import { verifySellerJWT } from "../middlewares/authSeller.middleware.js";

const sellerRouter = Router();

sellerRouter.route("/login").post(loginSelller);
sellerRouter.route("/is-auth").get(verifySellerJWT, isAuth);
sellerRouter.route("/logout").get(verifySellerJWT, logoutSeller);

export default sellerRouter;
