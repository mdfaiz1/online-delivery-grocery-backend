import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    items: [
      {
        product: {
          type: String,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      ref: "Address",
    },
    status: {
      type: String,
      default: "Order Placed",
    },
    paymentType: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.model.Order || mongoose.model("Order", orderSchema);
