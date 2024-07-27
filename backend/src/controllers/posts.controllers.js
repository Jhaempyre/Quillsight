import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
import { Post } from "../models/post.models.js";
import { CreatedPost } from "../models/createdPosts.models.js";
import { SavedPost } from "../models/savedItems.models.js";

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
const savePost = asyncHandler(async(req,res)=>{
    console.log("request to save the liked posts")
    try {
        const {id} = req.body
        const username = req.theUser.username
        /*if (userPosts) {
            userPosts.allPosts.push(id);
            await userPosts.save();
        } else {
            userPosts = await SavedPost.create({
                allPosts: [id],
                username 
            });
        }*/
       const savedItems = await SavedPost.findOne({username : username})
       if(!savedItems){
        const savedItems = await SavedPost.create({
            allPosts: [id],
            username
            });
       }else{
        savedItems.allPosts.push(id)
        await savedItems.save();
       }
        console.log("worked here");
        return res.status(200).json(
            new ApiResponse(
                200,"post saved into saved items"
            )    
        )
    } catch (error) {
        console.log(error)
        throw new ApiError(400,`${error.message}`)
    }
})
const getSavedUpdate = asyncHandler(async (req, res) => {
    console.log("Request to get user's saved items");

    try {
        const username = req.theUser.username;
        console.log(username)
        if (!username) {
            throw new ApiError(401, "User not authenticated");
        }

        // Find the SavedPost document for the user
        const savedItems = await SavedPost.findOne({ username }).populate({
                                              path: 'allPosts',
                                              select: 'tittle image content category createdAt' // Select the fields you want to include
                                          });

        if (!savedItems) {
            return res.status(200).json(
                new ApiResponse(200, { savedItems: [] }, "No saved items found for the user")
            );
        }

        // If savedItems exist, return them
        return res.status(200).json(
            new ApiResponse(
                200,
                { 
                    savedItems: savedItems.allPosts,
                    totalSaved: savedItems.allPosts.length
                },
                "Saved items retrieved successfully"
            )
        );

    } catch (error) {
        console.error("Error retrieving saved items:", error);
        throw new ApiError(error.statusCode || 500, `Failed to retrieve saved items: ${error.message}`);
    }
})
const editPost = asyncHandler(async(req, res) => {
    console.log("Request to edit a post");
    try {
        const { tittle, content, category, postId } = req.body;
        const username = req.theUser.username;

        if (!postId) {
            throw new ApiError(400, "Post ID is required");
        }

        const post = await Post.findById(postId);

        if (!post) {
            throw new ApiError(404, "Post not found");
        }

        // Check if the user is the owner of the post
        if (post.username !== username) {
            throw new ApiError(403, "You don't have permission to edit this post");
        }

        let imageUrl;
        if (req.file) {
            const imageLocalPath = req.file.path;
            imageUrl = await uploadOnCloudinary(imageLocalPath, "Post");
            if (!imageUrl) {
                throw new ApiError(500, "Error uploading image to Cloudinary");
            }
            post.image = imageUrl.url;
            console.log("Photo updated");
        }

        // Update other fields if provided
        if (tittle) post.tittle = tittle;
        if (content) post.content = content;
        if (category) post.category = category;

        await post.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                { post },
                "Post updated successfully"
            )
        );

    } catch (error) {
        console.log(error)
        throw new ApiError(error.statusCode || 500, `Failed to edit post: ${error.message}`);
    }
})
const deletePost = asyncHandler(async (req, res) => {
    console.log("Request to delete a post");
    try {
        const { postId } = req.body;
        const username = req.theUser.username;

        if (!postId) {
            throw new ApiError(400, "Post ID is required");
        }

        const post = await Post.findById(postId);

        if (!post) {
            throw new ApiError(404, "Post not found");
        }

        // Check if the user is the owner of the post
        if (post.username !== username) {
            throw new ApiError(403, "You don't have permission to delete this post");
        }

        // Delete the post
        await Post.findByIdAndDelete(postId);

        // Remove the post from the user's CreatedPost document
        await CreatedPost.findOneAndUpdate(
            { username: username },
            { $pull: { allPosts: postId } }
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Post deleted successfully"
            )
        );
    } catch (error) {
        console.error("Error deleting post:", error);
        throw new ApiError(error.statusCode || 500, `Failed to delete post: ${error.message}`);
    }
});

export {addPost,
    getCreatedPost,
    getAllUpdate,
    getSavedUpdate,
    editPost,
    deletePost,
    savePost
}