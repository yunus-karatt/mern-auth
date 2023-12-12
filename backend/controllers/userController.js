import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import fs from 'fs'
import path from "path";

// Auth user/set token
// POST /api/users/auth
// public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar:user.avatar
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Register a new user
// POST /api/users
// public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar:user.avatar
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Logout user
// POST /api/users/logout
// public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logged out  " });
});

// get user profile
// GET /api/users/profile
// private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// Update user profile
// PuT /api/users/profile
// private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log(req.file)
  if (user) {
    if(req.file){
      const filePath=path.join('backend','public','images',user.avatar)

      fs.unlink(filePath,(err)=>{
        if(err)console.log(err)
      })
      
      user.avatar=req.file.filename
    }
    
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar:updatedUser.avatar
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const google = async (req, res, next) => {
  try {
    const user =await User.findOne({ email: req.body.email });
    
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar:user.avatar
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const user = await User.create({
        name: req.body.name.split(" ").join("").toLowerCase(),
        email: req.body.email,
        password: generatedPassword,
        avatar:req.body.avatar
      });
      if (user) {
        generateToken(res, user._id);

        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar:user.avatar
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data", error);
  }
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  google,
};
