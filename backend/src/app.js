import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app =  express()
// to permit the cross origin 
app.use(cors({
    origin:'https://quillsight.vercel.app',
    credentials:true,
    optionsSuccessStatus: 200
}))
app.use(cors(corsOptions));

// to parse the incoming requests with JSON payloads (from req.body)

app.use(express.json({
    limit:"16kb"
}))

// To handle cookies 

app.use(cookieParser())

// to get the url encoding

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

app.use(express.static("public"))//public asset hae jaha 

import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
app.use("/api/v1/user",userRouter)
app.use("/api/v1/post",postRouter)

export {app}