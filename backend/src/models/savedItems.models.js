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
                type:String ,
                required : true
        },

},{
    timeseries:true,
    timestamps:true
})

export const SavedPost = mongoose.model("Saved",savedPostSchema)