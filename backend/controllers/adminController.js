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

const updateUserAccess = asyncHandler(async (req, res) => {
  const _id = req.query.id;
  const user = await User.findById(_id);
  if (user) {
    user.isBlocked = !user.isBlocked;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const _id = req.query.id;
  await User.deleteOne({ _id });
  res.status(200).json({ deleted: true });
});

const updateUserData = asyncHandler(async(req, res) => {
  const { email, name,_id } = req.body;
  await User.updateOne({_id},{$set:{name,email}})
  res.status(200).json({updated:true})
});

const getUserToUpdate = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const user = await User.findOne({ _id }, { _id: 1, name: 1, email: 1 });
  res.status(200).json(user);
});

export {
  registerAdmin,
  authAdmin,
  getUserData,
  logout,
  updateUserAccess,
  deleteUser,
  updateUserData,
  getUserToUpdate,
};
