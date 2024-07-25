import mongoose , {Schema} from "mongoose";

const followsSchema = new Schema(
    {
        follower:[
            {
                type:Schema.Types.ObjectId,
                ref : "User",
                default :[]
            }
        ],   
        following:{
                type:Schema.Types.ObjectId,
                ref:'User',
                default :[]
        },
        username:{
            type:String,
            required:true
        }

},{
    timeseries:true,
    timestamps:true
})

export const Follows = mongoose.model("Follows",followsSchema)