let express=require("express")
let {routerJobs,routerUsers,routerAuth}=require("./controller/router")
let {connect,job_model,user_model}=require("./connect.js")
const cors=require("cors")
const app=express()

require("dotenv").config()
app.use(cors())

app.use(express.urlencoded({extended:false}))
app.use("/",routerJobs)
app.use("/users",routerUsers,routerAuth)

app.get("/",async (req,res,next)=>{
    res.send("Csvs")
    next()  

})


let start=async()=>{
    try{
        await connect(process.env.USER_KEY)
        app.listen(5555,()=>{
            console.log("server running")
        })
        console.log("Connected")
       
      
       
        
    }catch(err){
        console.log(err)
    }
    
}

start()
