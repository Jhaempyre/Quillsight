import { Router } from "express";
import { authVerify } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { addPost,
     deletePost,
      editPost,
       getAllUpdate,
        getCreatedPost,
         getSavedUpdate,
          getThePost,
          removeSavedItem,
          savePost } from "../controllers/posts.controllers.js";
import { follow, followerList, followingList, unfollow } from "../controllers/user.controllers.js";

const router = Router()
router.route("/addPost").post(authVerify,upload.single("image"),addPost)
router.route("/getyourpost").get(authVerify,getCreatedPost)
router.route("/getAllPost").get(authVerify,getAllUpdate)
router.route("/savepost").post(authVerify,savePost)
router.route("/savedpost").get(authVerify,getSavedUpdate)
router.route("/editPost").post(authVerify,upload.single("image"),editPost)
router.route("/deletePost").post(authVerify,deletePost)
router.route("/removesavedpost").post(authVerify,removeSavedItem)
router.route("/:id").get(authVerify, getThePost);


export default router