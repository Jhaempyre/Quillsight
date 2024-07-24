import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
import { Post } from "../models/post.models.js";
import { createdPost } from "../models/createdPosts.models.js";

const addPost = asyncHandler(async (req, res) => {
    try {
        console.log("got request to add a post");
        const { tittle, content, category } = req.body;
        const username = req.theUser?.username;
        console.log(username);
        
        if (!tittle || !content || !category) {
            throw new ApiError(400, "All fields are required");
        }
        
        let imageLocalPath;
        
        if (req.file) {
            imageLocalPath = req.file.path;
        }
        
        const imageUrl = await uploadOnCloudinary(imageLocalPath, "Post");
        console.log(imageUrl);
        
        const thePost = await Post.create({
            tittle,
            content,
            category,
            image: imageUrl?.url || "",
            username: username
        });
        
        console.log("thePost", thePost);
        if (!thePost) {
            throw new ApiError(400, "Something went wrong at server side, please try again later");
        }
        
        let userPosts = await createdPost.findOne({ username: username });
        
        if (userPosts) {
            userPosts.allPosts.push(thePost._id);
            await userPosts.save();
        } else {
            userPosts = await createdPost.create({
                username,
                allPosts: [thePost._id]
            });
        }
        
        console.log("worked here");
        console.log("everything worked fine");
        return res.status(201).json(new ApiResponse(201, thePost, "Article posted successfully."));
    } catch (error) {
        throw new ApiError(400, `${error.message}`);
    }
});
const getCreatedPost = asyncHandler(async(req,res)=>{  
})
const getAllUpdate = asyncHandler(async(req,res)=>{ 
})
const getSavedUpdate = asyncHandler(async(req,res)=>{ 
})
const editPost = asyncHandler(async(req,res)=>{
})
const deletePost = asyncHandler(async(req,res)=>{
})

export {addPost,
    getCreatedPost,
    getAllUpdate,
    getSavedUpdate,
    editPost,
    deletePost
}