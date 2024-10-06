import { useEffect,useContext } from "react";
import {Link} from "react-router-dom"
import { chngSigninContext, signinContext,usernameContext,chngUsernameContext } from "./SigninProvider";
export default function LoginButton(){

    let isSignin=useContext(signinContext)
    let chngIsSignin=useContext(chngSigninContext)
    let chngUsername=useContext(chngUsernameContext)
    let username=useContext(usernameContext)
    console.log(isSignin)
    console.log(username)
    console.log(isSignin)
    
    return <div className="w-[250px] flex flex-col justify-between mt-[20px]">
    <span className='pt-[5px] pb-[5px] w-[150px]'>{(()=>{
      
      return  `Hey ${username.split(" ")[0]}`
      
    })()}</span>
        <Link className='' to={isSignin==true? `/`:`/signin`}>
    <button className='  pt-[5px] pb-[5px] ' onClick={()=>{
        
      console.log("pressed")
      if(isSignin===true){
        localStorage.setItem("signIn",false)
        localStorage.setItem("UserName","")
        chngUsername("")
      }

    
    }}>{isSignin? "Sign Out":"Sign In"}</button></Link>
  </div>
    
   
}