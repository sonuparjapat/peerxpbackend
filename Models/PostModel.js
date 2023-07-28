const mongoose=require("mongoose")

const schema=mongoose.Schema({
    name:String,
description:String,
category:String,
amount:Number,
date:String,
time:String,
updatedtime:String,
createdby:String,
authorId:{type:String,required:true}
})

const userpostModel=mongoose.model("userposts",schema)
module.exports={userpostModel}