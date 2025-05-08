import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiREsponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async () => {
  try {
    const payload = {
      email: process.env.SELLER_EMAIL,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

export const loginSelller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (
    email != process.env.SELLER_EMAIL ||
    password != process.env.SELLER_PASSWORD
  ) {
    throw new ApiError(400, "Invalid Credential");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens();
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: "Seller",
          accessToken,
          refreshToken,
        },
        "Seller logged In Successfully"
      )
    );
});

export const isAuth = asyncHandler(async (req, res) => {
  try {
    // const { userId } = req.body;
    const sellerEmail = req.seller.email;
    if (sellerEmail != process.env.SELLER_EMAIL) {
      throw new ApiError(409, "Unauthorised Request");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Authorized User"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized User");
  }
});

export const logoutSeller = asyncHandler(async (req, res) => {
  const email = req.seller.email;
  if (email != process.env.SELLER_EMAIL) {
    throw new ApiError(409, "Unauthorised Seller");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Seller loggedOut Successfully"));
});
