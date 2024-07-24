import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
import { Post } from "../models/post.models.js";
import { CreatedPost } from "../models/createdPosts.models.js";

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
        
        let userPosts = await CreatedPost.findOne({ username: username });
        
        if (userPosts) {
            userPosts.allPosts.push(thePost._id);
            await userPosts.save();
        } else {
            userPosts = await CreatedPost.create({
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
    console.log("request to get the posts")
    try {
        const username = req.theUser?.username
        console.log(username)
        const userPosts = await CreatedPost.findOne({username:username}).populate('allPosts');
        console.log(userPosts)
        if(!userPosts){
            throw new ApiError(400,"No post founds")
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                userPosts.allPosts,
                "All posts founds"
            ))
        
    } catch (error) {
        console.log(error)
        throw new ApiError(400,`${error.message}`)
    }
})
const getAllUpdate = asyncHandler(async(req,res)=>{ 
    console.log("request to get the posts")
    try {
        const thePost = await CreatedPost.find({}).populate('allPosts');
        console.log(thePost)
        if(!thePost){
            throw new ApiError(400,"No post founds")
            }
            const allPosts = thePost.reduce((acc, doc) => {
                return acc.concat(doc.allPosts);
              }, []);    
              console.log(allPosts)
              if (allPosts.length === 0) {
                throw new ApiError(404, "No posts found");
              }
              return res.status(200).json(
                new ApiResponse(200, allPosts, "All posts founds")
                );
    } catch (error) {
        console.log(error)
        throw new ApiError(400,`${error.message}`)
    }
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