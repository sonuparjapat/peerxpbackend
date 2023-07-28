const express=require("express")
const { userpostModel } = require("../Models/PostModel")
const postRouter=express.Router()


postRouter.get("/posts",async(req,res)=>{
    const {authorId}=req.body
const {page,limit,name,date}=req.query

let query={}
// if(authorId){
//     query.authorId=authorId
// }
if(name){
    query.name=name
}

if(date){
    // console.log(date)
    query.date={ $regex: date }
}
const maindata=await userpostModel.find(query)
if(page&&limit){
    try{
      
const data=await userpostModel.find(query).skip((limit*page)-limit).limit(limit)
res.status(200).json({"data":data,"totalpages":Math.ceil((maindata.length)/limit),length:maindata.length})
    }catch(err){
        res.status(400).json({msg:"somthing going wrong"})
    }
}else{
    const data=await userpostModel.find(query)
    res.status(200).json({data})
}



})

postRouter.post("/postdata",async(req,res)=>{
    req.body.time=Date.now()
    req.body.updatedtime=Date.now()
    
    try{
        const data=new userpostModel(req.body)
        await data.save()
        res.status(200).json({msg:"Expense Created Successfully"})
    }catch(err){
        res.status(400).json({msg:"Failed to create"})
    }
})
postRouter.delete("/deletedata/:id",async(req,res)=>{
    const {id}=req.params
const {authorId}=req.body
const data=await userpostModel.findOne({"_id":id})
    try{
if(data.authorId==authorId){
    await userpostModel.findOneAndDelete({"_id":id})
    res.status(200).json({msg:"Expense Deleted Successfully"})
}else{
    res.status(400).json({msg:"You are Not authorised to do this task"})
}
    }catch(err){
        res.status(400).json({msg:"failed to delete expense"})
    }
})


postRouter.patch("/updatedata/:id",async(req,res)=>{


// req.body.time=Date.now()
    const {id}=req.params
const {updatedtime,time,authorId}=req.body
req.body.time=updatedtime
req.body.updatedtime=Date.now()

const data=await userpostModel.findOne({"_id":id})
    try{
if(data.authorId==authorId){
    await userpostModel.findOneAndUpdate({"_id":id},req.body)
    res.status(200).json({msg:"Expense Updated Successfully"})
}else{
    res.status(400).json({msg:"You are Not authorised to do this task"})
}
    }catch(err){
        res.status(400).json({msg:"failed to delete expense"})
    }
})
module.exports={postRouter}