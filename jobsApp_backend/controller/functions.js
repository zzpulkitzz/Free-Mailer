const {job_model,user_model}=require("../connect")
require("dotenv").config()
const jwt=require("jsonwebtoken")
const  CustomError  = require("../customError")
let x="hey"
console.log(x)
let y="say"
console.log(y)

let get_func_jobs=async (req,res)=>{
    console.log("getting")
    try{
       
    let userId=req.query.userId
    console.log(req.query)
    let searchExp=req.query.searchExpKey
    let searchAlgo=searchExp===undefined?{}:{
        
            $or: [
                { companyName: {$regex:`${searchExp}`} },
                { position: {$regex:`${searchExp}`} }
            ]}
    
    console.log(userId)
    let user=await user_model.find({_id:userId})
    console.log(user)
    console.log(user[0].jobs)
    let jobs=user[0].jobs
    res.status(200).json(jobs)
}catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}

let post_func_jobs=async (req,res)=>{
    console.log(req.body)
     
    try{
        
        let userId=req.query.userId    
        let jobId=req.query.jobId
        let body=req.body
        console.log(req.query)
        let user=await user_model.find({_id:userId})
        console.log(user)
        user[0].jobs.push(req.body)
        console.log(user)
        user=new user_model(user[0])
        let final=await user.save()
        res.status(200).json(final)
    }catch(err){
        console.log(err)
        res.send(err)
    }
    
}
let edit_func_jobs=async(req,res)=>{
    try{
        let jobId=req.query.jobId
        let userId=req.query.userId
        
        let edited=await user_model.findOneAndUpdate({_id:userId,"jobs._id":jobId},{$set:{"jobs.$":req.body}})
        console.log(edited)
        res.status(200).json(edited)

       
    }catch(err){
        console.log(err)
    }
}

let delete_func_jobs=async(req,res)=>{
    console.log("deleting")
    let jobId=req.query.jobId
    let userId=req.query.userId
    
    try{
        let deleted=await user_model.findOneAndUpdate({_id:userId},{$pull:{jobs:{_id:jobId}}})
        console.log("done deleting",deleted)
        console.log(jobId,userId)
        res.status(200).json(deleted)
    }catch(err){
        console.log(err)
    }
}

let get_func_users=async (req,res)=>{
    let token=req.headers["authorization"].split(" ")[1]
    jwt.verify(token,process.env.SECRET_KEY)
    console.log("gettin")
    let user=await user_model.find({})
    req.status(200).json({user})
}
let post_func_users=async(req,res)=>{
    try{
        console.log("signining up!")
        let {userName,password}=req.body
        let user=await user_model.create(req.body)
        console.log("created",user)
        res.status(200).json({status:200,user:user})
    }catch(err){
        
        if (err.code === 11000) {
            console.log(err)
            console.log("heyjude")
            let customErr=new CustomError("Email Registered Already",11000)
            console.log(customErr.message)
            res.status(400).json({status:customErr.status, message:customErr.message});
        }else{
            res.status(400).json(err)
        console.log(err)
        }
        
    }
    
}
let post_auth=async(req,res)=>{
    try{
        let {userName,password}=req.body
    console.log(process.env.SECRET_KEY)
    const token =jwt.sign(userName,process.env.SECRET_KEY)
    let matchedData=await user_model.findOne({"userName":userName})
    console.log(matchedData)
    if(matchedData==null){
        throw new CustomError("Email id not registered",400)
    }else{
    if(matchedData.password===password){
        res.status(200).json({status:200,token:token,id:matchedData._id,user:matchedData})
    }else{
        throw new CustomError("sorry wrong password",400)
    }}
    }catch(err){
        console.log("dsv",err)
        res.status(400).json({status:400,message:err.message})
    }
    
    

}
let errHandler=async (err,req,res)=>{
    console.log(err)
}
module.exports={get_func_jobs,post_func_jobs,delete_func_jobs,get_func_users,post_func_users,edit_func_jobs,post_auth,errHandler}
