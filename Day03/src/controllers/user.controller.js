import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exist: username, email
  // check for images and avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response

  const { fullname, email, username, password } = req.body;
  console.log("email:", email);
  // if(fullname === ""){
  //     throw new ApiError(400, "fullname is reqired")
  // }
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are reqired");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }]
  })
  console.log(existedUser)
  if(existedUser){
    throw new ApiError(409, "User with Username or Email already exists")
  }
//images
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  console.log(avatarLocalPath)
  console.log(coverImageLocalPath)

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
  }

//cloudinary upload
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }
    console.log(avatar)
    console.log(coverImage)

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registration user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
});

export { registerUser };