import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiREsponse.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

export const placeOrderCOD = asyncHandler(async (req, res) => {
  const { userId, items, address } = req.body;
  if (!address || !items || items.length === 0) {
    throw new ApiError(400, "Address and Items are required");
  }
  let amount = await items.reduce(async (acc, item) => {
    const product = await Product.findById(item.product);
    return (await acc) + product.price * item.quantity;
  }, 0);
  amount += Math.floor(amount * 0.18); // Adding tax

  const order = await Order.create({
    userId,
    items,
    amount,
    address,
    paymentType: "COD",
    isPaid: false,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order Placed Successfully"));
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }
  const orders = await Order.find({
    userId,
    $or: [{ paymentType: "COD" }, { isPaid: true }],
  })
    .populate("items.product address")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Fetched Orders Successfully"));
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    $or: [{ paymentType: "COD" }, { isPaid: true }],
  })
    .populate("items.product address")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Fetched All Orders Successfully"));
});
