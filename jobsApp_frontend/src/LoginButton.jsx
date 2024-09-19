import { useEffect,useContext } from "react";
import {Link} from "react-router-dom"
import { chngSigninContext, signinContext,usernameContext,chngUsernameContext } from "./SigninProvider";
export default function LoginButton(){

    let isSignin=useContext(signinContext)
    let chngIsSignin=useContext(chngSigninContext)

      let username=useContext(usernameContext)
      console.log(isSignin)
      console.log(username)
    console.log(isSignin)

    return <div className="w-[180px] flex flex-row justify-between">
    <span className='pt-[5px] pb-[5px]'>{(()=>{
      
      return  `Hey ${username}`
      
    })()}</span>
        <Link className='' to={isSignin==true? `/`:`/signin`}>
    <button className='bg-[rgb(86,52,243)] pl-[10px] pr-[10px] pt-[5px] pb-[5px]' onClick={()=>{
        chngIsSignin((false))
      if(isSignin===true){
        localStorage.setItem("signIn",false)
      }

    
    }}>{isSignin? "Sign Out":"Sign In"}</button></Link>
  </div>
    
   
}