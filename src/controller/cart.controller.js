import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiREsponse.js";
import { User } from "../models/user.model.js";

export const updateCart = asyncHandler(async (req, res) => {
  const { userId, cartItems } = req.body;
  const updateCart = await User.findByIdAndUpdate(userId, { cartItems }).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updateCart, "Cart Updated Successfully"));
});
