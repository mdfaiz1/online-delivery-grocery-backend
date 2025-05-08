import { Router } from "express";
import { updateCart } from "../controller/cart.controller.js";
import { verifyUserJWT } from "../middlewares/authUser.middleware.js";
const cartRouter = Router();

cartRouter.route("/").patch(verifyUserJWT, updateCart);

export default cartRouter;
