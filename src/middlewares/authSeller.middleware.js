import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const verifySellerJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decodeToken.email !== process.env.SELLER_EMAIL) {
      throw new ApiError(401, "Unauthorized seller");
    }
    req.seller = { email: decodeToken.email };
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Token");
  }
});
