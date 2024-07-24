import mongoose , {Schema} from "mongoose";

const postSchema = new Schema(
    {
        tittle:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
            },
        category:{
            type:String,
            required:true
        },    
        username:{
                type:Schema.Types.ObjectId,
                ref:'User',
        },

},{
    timeseries:true,
    timestamps:true
})

export const Post = mongoose.model("post",postSchema)