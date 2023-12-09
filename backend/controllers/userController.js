import asyncHandler from "express-async-handler";

// Auth user/set token
// POST /api/users/auth
// public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth " });
});

// Register a new user
// POST /api/users
// public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "register user " });
});

// Logout user
// POST /api/users/logout
// public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout user " });
});

// get user profile
// GET /api/users/profile
// private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "user profile" });
});

// Update user profile
// PuT /api/users/profile
// private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "update user profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
