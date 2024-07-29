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

        //use kali linux and you will hate windows 
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
const getThePost = asyncHandler(async(req,res)=>{
    try {
    const { id } = req.params;
     // Find the post by ID
     const post = await Post.findById(id);
     if (!post) {
        throw new ApiError(404, "Post not found");
      }
      // Find the user who created the post
    const createdPost = await CreatedPost.findOne({ allPosts: id });
    if (!createdPost) {
        throw new ApiError(404, "Post creator not found");
      }
     // Find the user details
     const user = await User.findOne({ username: createdPost.username });
     if (!user) {
        throw new ApiError(404, "User not found");
      }
        // Construct the response object
        const response = {
            id: post._id,
            title: post.tittle,
            content: post.content,
            image: post.image,
            category: post.category,
            date: post.createdAt,
            author: user.username,
            authorAvatar: user.avtar,
            authorBio: user.bio
          };
          return res.status(200).json(
            new ApiResponse(
              200,
              response,
              "Post retrieved successfully"
            )
          );
        } catch (error) {
            console.log(error);
            throw new ApiError(error.statusCode || 500, error.message || "Something went wrong while fetching the post");
          }
          
})
const getCreatedPost = asyncHandler(async (req, res) => {
    console.log("Request to get the posts");
    try {
        const username = req.theUser?.username;
        console.log(username);
        const userPosts = await CreatedPost.findOne({ username }).populate('allPosts');
        console.log(userPosts);
        
        if (!userPosts || userPosts.allPosts.length === 0) {
            return res.status(200).json(new ApiResponse(200, [], "No posts found"));
        }

        return res.status(200).json(new ApiResponse(200, userPosts.allPosts, "All posts found"));
    } catch (error) {
        console.log(error);
        throw new ApiError(400, `${error.message}`);
    }
});

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
        console.log(id)
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
        console.log(username);

        if (!username) {
            throw new ApiError(401, "User not authenticated");
        }

        const savedItems = await SavedPost.findOne({ username }).populate({
            path: 'allPosts',
            select: 'tittle image content category createdAt'
        });

        if (!savedItems || savedItems.allPosts.length === 0) {
            return res.status(200).json(new ApiResponse(200, { savedItems: [] }, "No saved items found for the user"));
        }

        return res.status(200).json(new ApiResponse(
            200,
            { savedItems: savedItems.allPosts, totalSaved: savedItems.allPosts.length },
            "Saved items retrieved successfully"
        ));
    } catch (error) {
        console.error("Error retrieving saved items:", error);
        throw new ApiError(error.statusCode || 500, `Failed to retrieve saved items: ${error.message}`);
    }
});
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
const removeSavedItem = async (req, res) => {
    console.log("Request to remove a saved post");
    try {
        const { postId } = req.body;
        const username = req.theUser.username;

        if (!postId) {
            throw new ApiError(400, "Post ID is required");
        }

        if (!username) {
            throw new ApiError(401, "User not authenticated");
        }

        // Find the user's saved posts document
        const savedPost = await SavedPost.findOne({ username });

        if (!savedPost) {
            throw new ApiError(404, "Saved items not found for this user");
        }

        // Remove the postId from the allPosts array
        savedPost.allPosts.pull(postId);
        await savedPost.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Saved post removed successfully"
            )
        );
    } catch (error) {
        console.error("Error removing saved post:", error);
        throw new ApiError(error.statusCode || 500, `Failed to remove saved post: ${error.message}`);
    }
};

export {addPost,
    getCreatedPost,
    getAllUpdate,
    getSavedUpdate,
    editPost,
    deletePost,
    savePost,
    getThePost,
    removeSavedItem
}