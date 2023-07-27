const express=require('express')
const cors=require("cors")
const { userrouter } = require('./Controls/userControl')
const { connection } = require('./Models/userModel')
const { auth } = require('./Auth/Authentication')
const { postRouter } = require('./Controls/UserPostControl')
const app=express()
app.use(cors())

app.use(express.json())


app.use("/user",userrouter)
app.use(auth)
app.use("/userpost",postRouter)
app.listen(8080,async()=>{
   try{ await connection
    console.log("connected to db")
}catch(err){
        console.log(err)
    }
    console.log("port running on 8080")
})