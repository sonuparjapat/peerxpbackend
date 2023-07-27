const jwt=require("jsonwebtoken")

 const auth=async(req,res,next)=>{
const token=req.headers.authorization
// console.log(token)

if(token){
    try{
        jwt.verify(token.split(" ")[1], 'masai', function(err, decoded) {
         if(decoded){
            req.body.authorId=decoded.authorId
            req.body.createdby=decoded.createdby
            next()
         }else{
            res.status(400).json({msg:"Token Expired/Wrong Token"})
         }
          });
    }catch(err){
        res.status(400).json({msg:"somthing going wrong"})
    }
}else{
    res.status(400).json({msg:"Please login first"})
}
}
module.exports={auth}