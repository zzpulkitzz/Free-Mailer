import {useEffect,useState,useContext} from "react"
import {useNavigate} from "react-router-dom"
import { chngSigninContext, signinContext,usernameContext,
    chngUsernameContext } from "./SigninProvider.jsx"
export default function Signin(prop){
    const isSignin=useContext(signinContext)
    const chngSignIn=useContext(chngSigninContext)
    const chngUsername=useContext(chngUsernameContext)
    console.log(isSignin)
    const history=useNavigate()
    const [is_reg,set_is_reg]=useState(true)
    const [errMessage,setErrMessage]=useState()
    console.log("vfdv")
    async function sendData(fetchUrl,postData){
            
            try{
                console.log(fetchUrl)
                let response=await fetch(fetchUrl,{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body: JSON.stringify(postData)})
                let res=await response.json()

                
                return res
            }catch(error){
                console.log(error)
            }
        }
    async function onSignup(event){
        event.preventDefault()
        let form=document.getElementsByClassName("form")[0]
        let formData=new FormData(form)
        let formItrt2=formData.entries()
        console.log(formItrt2)
        let formDict2={}
        for(const [key,value] of formItrt2){
            formDict2[key]=value
        }
        console.log(formDict2)
        const response=await sendData("http://localhost:5555/users/signup",formDict2)
        let formDict={}
        if(response && response.status==200){
                Object.keys(formDict2).filter((elem)=>elem!="name").map((key)=>{
                    console.log(key)
                    return formDict[key]=formDict2[key]
                })
                console.log(formDict)

                setTimeout(async ()=>{

   
                    let response_signin= await sendData("http://localhost:5555/users/signin",formDict)
                    console.log(response_signin)
                    if(response_signin){
                        chngUsername(response_signin.user.name)
                        localStorage.setItem("UserName",response_signin.user.name)
                        console.log(response_signin.id)
                        let id=response_signin.id
                        localStorage.setItem("token",response_signin.token)
                        console.log(id)
                        history(`/jobs?userId=${id}`)
                        chngSignIn(true)
                        localStorage.setItem("signIn",true)
                    }
                    
                },[1000])
        }else{
            console.log(response)
            setErrMessage(()=>{
                return response.message
            })
        }
        
}


    async function onSignin(event){
        event.preventDefault()
        let form=document.getElementsByClassName("form")[0]
        let formData=new FormData(form)
        let formItrt2=formData.entries()
        console.log(formItrt2)
        let formDict2={}
        for(const [key,value] of formItrt2){
            formDict2[key]=value
        }
        console.log(formDict2)
        let response=await sendData("http://localhost:5555/users/signin",formDict2)
        console.log("ye",response)
        if(response.status==200){
            chngUsername(response.user.name)
            localStorage.setItem("UserName",response.user.name)
                console.log(response.token)
                localStorage.setItem("token",response.token)
                let id=response.id
                console.log(id)
                history(`/jobs?userId=${id}`)
                chngSignIn(true)
                localStorage.setItem("signIn",true)
            }else{
                console.log(response.message)
                setErrMessage(()=>{
                    return response.message
                })
                
              
            }
       
        
        
   

    }


    function onRegister(){
        set_is_reg(()=>{
            return false
        })
    }
    
    let blinkError=(errType)=>{
        console.log(errType)
        setTimeout(()=>{
            errType.classList.remove("opacity-0")
            errType.classList.add("opacity-100")
            errType.classList.add("transition-opacity")
            errType.classList.add("duration-300")
            
        },[100])

        setTimeout(()=>{
            errType.classList.remove("opacity-100")                  
            errType.classList.add("opacity-0")                    
        },[3000]) 

        errType.classList.remove("transition-opacity")
        errType.classList.remove("duration-300")
    }

    if(errMessage){
        console.log("yo")
        let err=document.getElementsByClassName("err")[0]
        blinkError(err)
    }

        window.addEventListener("storage",(event)=>{
            console.log("heyyhca")
            let signIn=localStorage.getItem("signIn")

           if(signIn==="true"){
            history("/jobs")
           }if(signIn==="false"){
            history("/signin")
           }
        })

   
    return <main className="main flex flex-col justify-center items-center h-[61vh] ">
      
    <form className={`form flex flex-col bg-white h-md:h-[320px] h-md:w-[430px] h-sm:w-[270px] h-sm:h-[51vh] shadow-md p-[15px] justify-between mt-[40px]`}>
    <h1 className='flex justify-center items-start'>
      
      <span className="text-[22px]">{is_reg==true? "Signin":"Register"} </span></h1>
      
      {is_reg==true?null:
      <div className="name flex flex-col  justify-between ">
      <label htmlFor="name" className='name_label text-sm text-[12px] text-[#5E5E5E] font-semibold'>Name:</label>
      <input type="text" id="name" name="name" required className=" border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] w-[78%]"/>
      </div>
      }
      <div className="userName flex flex-col  justify-between ">
        <label htmlFor="userName" className='userName_label text-sm text-[12px] text-[#5E5E5E] font-semibold'>User Name:</label>
        <input type="text" id="userName" name="userName" required className=" border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] w-[78%]"/>
        </div>
        <div className="password flex flex-col  justify-between">
        <label htmlFor="password" className='password_label text-sm text-[12px] text-[#5E5E5E] font-semibold'>Password:</label>
        <input type="password" id="password" name="password" required className="border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] w-[75%]"/>
        </div>
  
        <button type="submit " className='bg-[rgb(86,52,243)] text-[white] mt-[12px]' onClick={is_reg?onSignin:onSignup}>{is_reg?"Signin":"Register"}</button>

        {is_reg===true?<div className="Signin flex justify-center items-center mt-[-18px] text-sm">
            Not a member yet? <span className="text-[rgb(86,52,243)] " onClick={onRegister}>Register</span>
        </div>:<div className="flex justify-center items-center mt-[1px] text-sm ">Already a user? <span className="text-[rgb(86,52,243)] " onClick={()=>{
            set_is_reg(()=>{
                return true
            })
        }}> Signin</span></div>}
    </form>
    <div className="err mt-[20px] opacity-0 text-red-400">{errMessage}
    </div>
    </main>
}