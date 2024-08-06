import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
          
cloudinary.config({ 
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME, 
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadOnCloudinary = async(loacalFilePath)=>{
    try {

	console.log("Attempting to upload file:", localFilePath);
        if (!loacalFilePath) return null
	console.log("Attempting to upload file:", localFilePath);
        //upload
        const response = await cloudinary.uploader.upload(loacalFilePath,{
            resource_type:"auto"
        })
        //file sucess
        console.log("file is uploadaed",response.url);
        fs.unlinkSync(loacalFilePath)
        console.log("done")
        return response;
        
    } catch (error) {
	 console.error("Error uploading to Cloudinary:", error);
        fs.unlinkSync(loacalFilePath)
        return null 
        
    }
}

export {uploadOnCloudinary}


 
