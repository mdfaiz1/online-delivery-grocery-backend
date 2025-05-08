import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: false,
    },
    image: {
      type: Array,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export const Product =
  mongoose.model.Product || mongoose.model("Product", productSchema);
