const express=require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { userModel } = require("../Models/userModel")

const userrouter=express.Router()

userrouter.post("/register",async(req,res)=>{
    const {email,password}=req.body

    const data=await userModel.findOne({"email":email})
    if(!data){
        try{
            bcrypt.hash(password, 5, (err, hash)=> {
                if(hash){
                const data=new userModel({email,"password":hash})
                data.save()
                res.status(200).json({msg:"User Registered Successfully"})
                }else{
                    res.status(400).json({msg:"Not able to Register user"})
                }
            });
        }catch(err){
            res.status(400).json({msg:"something going wrong"})
        }
    }else{
        res.status(400).json({msg:"Already Registered User"})
    }
})

userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    const data=await userModel.findOne({"email":email})
    if(data){
        try{
            bcrypt.compare(password, data.password, function(err, result) {
                if(result){
                    var token = jwt.sign({ authorId:data._id ,createdby:data.email}, 'masai',{ expiresIn: 60 * 60 });
                    res.status(200).json({msg:"Login Successfully","token":token,"useremail":data.email})
                }else{
                    res.status(400).json({msg:"Password Mismatch"})
                }
                // result == true
            });
            
        }catch(err){
            res.status(400).json({msg:"somthing going wrong"})
        }
    }else{
        res.status(400).json({msg:"This User is not Registered"})
    }
})
module.exports={userrouter}