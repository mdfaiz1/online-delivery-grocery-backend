import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiREsponse.js";
import { Address } from "../models/address.model.js";

export const addAddress = asyncHandler(async (req, res) => {
  const { userId, address } = req.body;
  const newAddress = await Address.create({ userId, ...address });
  return res
    .status(201)
    .json(new ApiREsponse(201, newAddress, "Address Added Successfully"));
});

export const getAddress = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const address = await Address.find({ userId });
  if (!address) {
    throw new ApiError(404, "No Address Found");
  }
  return res
    .status(200)
    .json(new ApiREsponse(200, address, "Fetched Address Successfully"));
});
