import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'; 
import { User } from "../models/user.models.js";

const authVerify = asyncHandler(async(req,_,next)=>{
    try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
       console.log(token);
     if(!token){
       console.log("ram")
      throw new ApiError(400,"Unauthorised request")
 
     }
     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
     console.log("29");
     const theUser = await User.findById(decodedToken?._id).select("-password -refreshToken")
     console.log("33");
     if(!theUser){
      throw new ApiError(400,"Invalid access token")
 
     }
     req.theUser = theUser
     console.log("44");
     next()
    } catch (error) {
       console.log("lol")
     throw new ApiError(401, error?.message || "Invalid access token")    
    }   
 }) 
 
 export { authVerify }