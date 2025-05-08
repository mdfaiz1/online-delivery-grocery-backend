import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiREsponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

// Register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Mandatory Fields Required");
  }
  const exsitingUser = await User.findOne({ email });
  if (exsitingUser) {
    throw new ApiError(409, "User Already Exist");
  }
  // const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    name,
    password,
  });
  const newUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!newUser) {
    throw new ApiError(500, "Register Unsuccessfully");
  }

  // const token = jwt.sign(
  //   {
  //     id: newUser._id,
  //   },
  //   process.env.JWT_SECRET,
  //   {
  //     expiresIn: "10d",
  //   }
  // );

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "strict",
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  // });
  return res
    .status(200)
    .json(new ApiResponse(200, newUser, "Register Successfully"));
});

// Login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  // return [];

  if (!email || !password) {
    throw new ApiError(400, "Mandatory Fields Required");
  }

  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    throw new ApiError(404, "User Not Found");
  }
  // const isMatch = await bcrypt.compare(password, checkUser.password);
  const isPasswordValid = await checkUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect Password");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    checkUser._id
  );

  const loggedIn = await User.findById(checkUser._id).select(
    "-password -refreshToken"
  );
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
          user: loggedIn,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

export const isAuth = asyncHandler(async (req, res) => {
  try {
    // const { userId } = req.body;
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );

    return res.status(200).json(new ApiResponse(200, {}, "Authorized User"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized User");
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user loggedOut Successfully"));
});
