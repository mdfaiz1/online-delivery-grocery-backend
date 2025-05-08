import { Router } from "express";

const addressRouter = Router();
import { addAddress, getAddress } from "../controller/address.controller.js";
import { verifyUserJWT } from "../middlewares/authUser.middleware.js";

addressRouter.route("/").post(verifyUserJWT, addAddress);
addressRouter.route("/").get(verifyUserJWT, getAddress);

export default addressRouter;
