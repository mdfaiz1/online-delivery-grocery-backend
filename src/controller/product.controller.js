import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiREsponse.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

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
