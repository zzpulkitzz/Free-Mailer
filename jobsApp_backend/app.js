let express=require("express")
let nodemailer=require("nodemailer")

let {routerJobs,routerUsers,routerAuth}=require("./controller/router")
let {connect,job_model,user_model,email_model}=require("./connect.js")
const cors=require("cors")
const app=express()


  
  // Define email options
  
  
  // Send email






require("dotenv").config()
app.use(cors())
app.use(express.text())
app.use(express.urlencoded({extended:false}))
app.use("/",routerJobs)
app.use("/users",routerUsers,routerAuth)

app.get("/",async (req,res,next)=>{
    console.log("yo")
    
    let user= await user_model.find({"userName":"Cdvs"})
    console.log(typeof user)
    console.log(user==[])
    res.send("Csvs")
    next()  

})
app.get("/email",async (req,res,next)=>{
    try{
        let fields=req.query.fields
        console.log(fields)
        let email=await email_model.find({}).select(fields)
        res.status(200).json(email)

    }catch(e){
        console.log(e)
        res.status(404).json(e)
    }
    
})
app.post("/send",async (req,res,next)=>{
    let {applicantEmail,email}=req.query
    let message=req.body
    console.log(message)
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gpulkitgupta72@gmail.com',  // Your email address
      pass: 'jobn suze ryii hlto'    // Your email password (or app password for Gmail)
    }
  });
 
    let mailOptions = {
        from: 'gpulkitgupta72@gmail.com',
        to: email,
        subject: 'Automated Email',
        text: message
      };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            let response=info.response
      console.log('Email sent: ' + info.response);
      res.status(200).json(response)
    }})
    
})
app.get
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
