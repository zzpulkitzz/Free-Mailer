const {user_model}=require("../connect")

require("dotenv").config()





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

let signIn_func=async(req,res)=>{
    try{
        let {uid,email}=req.body
    
        let matchedData=await user_model.findOne({"uid":uid})
        console.log(matchedData)
        if(matchedData==null){
            user = new User({
                uid: uid,
                userEmail: email,
                jobs:[]
              });
              await user.save();
        }
        res.status(200).json({ message: 'User synced', user })
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    
    

}


let errHandler=async (err,req,res)=>{
    console.log(err)
}
module.exports={get_func_jobs,post_func_jobs,delete_func_jobs,edit_func_jobs,signIn_func,errHandler}
