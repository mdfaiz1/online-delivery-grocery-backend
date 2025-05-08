import { Router } from "express";
import {
  register,
  loginUser,
  logoutUser,
  isAuth,
} from "../controller/user.controller.js";
import { verifyUserJWT } from "../middlewares/authUser.middleware.js";
const userRouter = Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(loginUser);
userRouter.route("/is-Auth").get(verifyUserJWT, isAuth);
userRouter.route("/logout").get(verifyUserJWT, logoutUser);

export default userRouter;
