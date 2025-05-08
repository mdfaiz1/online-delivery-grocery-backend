import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiREsponse.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { Product } from "../models/product.model.js";

export const addProduct = asyncHandler(async (req, res) => {
  let productData = JSON.parse(req.body.productData);

  const imageFiles = req.files?.images; // images is the field name
  if (!imageFiles || imageFiles.length === 0) {
    throw new ApiError(400, "At least one image is required");
  }
  const uploadedImages = [];

  for (const file of imageFiles) {
    const localPath = file.path;
    const uploadedImage = await uploadCloudinary(localPath); // your custom Cloudinary function
    uploadedImages.push(uploadedImage.url);
  }

  const newProduct = await Product.create({
    ...productData,
    image: uploadedImages,
  });

  if (!newProduct) {
    throw new ApiError(500, "Something Went Wrong While Adding");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newProduct, "Product Added Successfully"));
});

export const productList = asyncHandler(async (req, res) => {
  const list = await Product.find();

  if (!list) {
    throw new ApiError(404, "No Data Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, list, "Featched Data Successfully"));
});

export const productById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Product Id Not found");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product Data Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Data Fetched Successfully"));
});

export const changeStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { inStock } = req.body;
  if (!id) {
    throw new ApiError(400, "Product ID Not Found");
  }
  await Product.findByIdAndUpdate(id, { inStock });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Update Stock Successfully"));
});
