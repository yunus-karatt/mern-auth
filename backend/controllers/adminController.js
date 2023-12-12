import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.create({
    email,
    password,
  });
  res.status(200).json(admin);
});

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && admin.matchPassword(password)) {
    generateToken(res, admin._id);
    res.status(201).json({ _id: admin._id, email: admin.email });
  } else {
    res.status(401);
    throw new Error("Inavalid username or password");
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "admin logged out  " });
});

const getUserData = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500);
    throw new Error("Cant fetch data from database");
  }
});

export { registerAdmin, authAdmin, getUserData, logout };
