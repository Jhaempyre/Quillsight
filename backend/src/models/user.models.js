import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,

        },
        bio:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase :true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,           
            lowercase :true,
            trim:true,
            index:true
        },
        avtar:{
            type:String ,//cloudnary url
            //required is made false
            required:false
        },
        password:{
            type: String ,
            required:[true,"Passowrd caahiye re baba"]
        },
        refreshToken:{
            type :String

        }
    },{
        timestamps:true
    }
    )

    userSchema.pre("save",async function(next){
        if(!this.isModified("password")) return next();
        this.password= await bcrypt.hash(this.password,11)
        next()
    })
    // In the User model
    userSchema.methods.isPasswordCorrect = async function(password){     
         return await bcrypt.compare(password, this.password)
     
    }

    userSchema.methods.genrateAccessToken = function()
{
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.genrateRefreshToken = function()
    {
        return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
    }

export const User = mongoose.model("user", userSchema)