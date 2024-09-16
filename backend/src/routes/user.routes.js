import { Router } from "express";
import { changePassword,
     getCurrentUser,
      loginUser,
       logOutUser,
        registerUser,
         follow, followerList, followingList, unfollow, 
         getAUserAndPost,
         healthCheck} from "../controllers/user.controllers.js";
import { authVerify } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router = Router()

router.route("/registerUser").post(upload.single("avtar"),registerUser)
router.route("/loginUser").post(loginUser)
router.route("/logout").post(authVerify,logOutUser)
router.route("/getUser").get(authVerify,getCurrentUser)
router.route("/changePassword").post(authVerify,changePassword)
router.route("/follow").post(authVerify,follow)
router.route("/unfollow").post(authVerify,unfollow)
router.route("/followerList").post(authVerify,followerList)
router.route("/followingList").post(authVerify,followingList)
router.route("/:username").get(getAUserAndPost)
router.route("/health/check").get(healthCheck)

export default router 