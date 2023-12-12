import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import Admin from "../models/adminModel.js";

export const protectAdminRoutes=asyncHandler(async(req,res,next)=>{
  let token;
  token=req.cookies.jwt
  if(token){
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    res.admin=await Admin.findOne({_id:decode.userId})
    next()
  }else{
    res.status(401)
    throw new Error("Not authorized , no token");

  }
})

