import mongoose , {Schema} from "mongoose";

const createdPostSchema = new Schema(
    {
        allPosts:[
            {
                type:Schema.Types.ObjectId,
                ref : "Post",
                default :[]
            }
        ],   
        username:{
                type:String,
                required:true
        },

},{
    timeseries:true,
    timestamps:true
})

export const createdPost = mongoose.model("Allpost",createdPostSchema)