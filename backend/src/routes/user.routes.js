import { Router } from "express";
import { changePassword, getCurrentUser, loginUser, logOutUser, registerUser } from "../controllers/user.controllers.js";
import { authVerify } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router = Router()

router.route("/registerUser").post(upload.single("avtar"),registerUser)
router.route("/loginUser").post(loginUser)
router.route("/logout").post(authVerify,logOutUser)
router.route("/getUser").get(authVerify,getCurrentUser)
router.route("/changePassword").post(authVerify,changePassword)

export default router 