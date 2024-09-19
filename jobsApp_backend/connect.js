let mongoose= require('mongoose')

const { Schema } = mongoose;
let connect=async (url)=>{
    try{
        await mongoose.connect(url


         )
        return null
    }
    catch(error){
        return error
    }
}
let job_schema= new Schema({
    companyName:{type:String,required:[true,"provide the company name"]},
    position:{type:String,required:[true,"provide the position name"]},
    email:{type:String}
})
let user_schema=new Schema({
    name:{type:String,required:[true,"provide the  name"],unique:false},
    userName:{type:String,required:[true,"provide the userId"],unique:true},
    password:{type:String,required:[true,"provide the password name"],unique:false},
    jobs:[job_schema]
})

let email_schema=new Schema({
    companyName:{type:String,required:[true,"provide the company name"],unique:false},
    hr:{type:String},
    email:{type:String,required:[true,"provide the email"]},

    
})

let job_model=mongoose.model("Job",job_schema)
let user_model=mongoose.model("User",user_schema)
let email_model=mongoose.model("Email",email_schema)
module.exports={connect,job_model,user_model,email_model}
