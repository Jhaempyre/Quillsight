import mongoose , {Schema} from "mongoose";

const savedPostSchema = new Schema(
    {
        allPosts:[
            {
                type:Schema.Types.ObjectId,
                ref : "Post",
                default :[]
            }
        ],   
        username:{
                type:Schema.Types.ObjectId,
                ref:'User',
        },

},{
    timeseries:true,
    timestamps:true
})

export const savedPost = mongoose.model("Allpost",savedPostSchema)