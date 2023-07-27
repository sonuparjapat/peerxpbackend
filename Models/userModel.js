require('dotenv').config()
const mongoose=require("mongoose")
const connection=mongoose.connect(process.env.MongoUrl)
const schema=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const userModel=mongoose.model("userdata",schema)
module.exports={connection,userModel}