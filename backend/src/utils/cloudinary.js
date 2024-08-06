import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config({
	path :'./.env'
})

const uploadOnCloudinary = async(localFilePath)=>{
    try {

	cloudinary.config({ 
  	cloud_name : process.env.CLOUDINARY_CLOUD_NAME, 
  	api_key : process.env.CLOUDINARY_API_KEY,
 	api_secret: process.env.CLOUDINARY_API_SECRET
});
	console.log("Cloudinary Config:", {
  	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  	api_key: process.env.CLOUDINARY_API_KEY,
  	api_secret: process.env.CLOUDINARY_API_SECRET
	});

	console.log("Attempting to upload file:", localFilePath);
        if (!localFilePath) return null
	console.log("Attempting to upload file:", localFilePath);
        //upload
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file sucess
        console.log("file is uploadaed",response.url);
        fs.unlinkSync(localFilePath)
        console.log("done")
        return response;
        
    } catch (error) {
	 console.error("Error uploading to Cloudinary:", error);
        fs.unlinkSync(localFilePath)
        return null 
        
    }
}

export {uploadOnCloudinary}


 
