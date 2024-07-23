import dotenv from "dotenv"

import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"
import connectDB from "./db/database.js"
import { app } from "./app.js"

dotenv.config({
    path:'./env'
})

//connecting to databse and spining up the server 
console.log(" Jai Shree ram")
connectDB().then(()=>{
    app.listen(process.env.PORT|| 8000,()=>{
        console.log(`server is runnning at ${process.env.PORT}`)
    } ) 
})
.catch((err)=>{
    console.log("mongo db connnection failuree!!!",err);
})