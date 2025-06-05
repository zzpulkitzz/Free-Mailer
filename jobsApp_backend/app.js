let express=require("express")
let nodemailer=require("nodemailer")

let {routerJobs,routerUsers,routerAuth}=require("./controller/router")
let {connect,job_model,user_model,email_model}=require("./connect.js")
const cors=require("cors")
const app=express()
const { google } = require('googleapis');
const { verifyFirebaseToken } = require('./controller/middleware');
const { signIn_func } = require('./controller/functions');


require("dotenv").config()
app.use(cors())
app.use(express.text())
app.use(express.urlencoded({extended:false}))
app.use("/",routerJobs)



const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://jobs-app-y9bs.onrender.com/auth/google/callback"
  );

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

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
    }})

app.get("/auth/google", (req, res) => {
        console.log("1")
        console.log(process.env.GMAIL_CLIENT_ID)
        const url = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          prompt: 'consent',
          scope: SCOPES,
        });

        
        console.log("2")
        res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
    const code = req.query.code;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.send("Authenticated! You can now send email.");
});




app.post("/send",async (req,res,next)=>{
    let {applicantEmail,email}=req.query
    let message=req.body
    console.log(message)
    oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
  
    const accessToken = await oAuth2Client.getAccessToken();
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token,
      }
    })
 
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

app.get("/signin",verifyFirebaseToken,signIn_func)

let start=async()=>{
    try{
        await connect(process.env.USER_KEY)
        app.listen(process.env.PORT,()=>{
            console.log("server runninger")
        })
        console.log("Connected")
       
      
       
        
    }catch(err){
        console.log(err)
    }
    
}

start()
