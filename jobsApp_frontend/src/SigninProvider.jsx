import { useContext,createContext, useState } from "react";
export const signinContext=createContext()
export const chngSigninContext=createContext()
export const usernameContext=createContext()
export const chngUsernameContext=createContext() 
export default function SigninProvider({children}){
    console.log(localStorage.getItem("signIn"))
    let isSignIn=localStorage.getItem("signIn")==undefined? true : localStorage.getItem("signIn")==="true"? true : false
    let UserName=localStorage.getItem("UserName")==undefined? "" : localStorage.getItem("UserName") 
    const [isSignin,setIsSignin]=useState(isSignIn)
    const [username,setUsername]=useState(UserName)
    function chngIsSignin(value){
        setIsSignin(()=>{
                    
            return value
        })
    }
    function chngUsername(value){
        setUsername(()=>{
            return value
        })
    }
    return <signinContext.Provider value={isSignin}>
            <chngSigninContext.Provider value={chngIsSignin}>
            <usernameContext.Provider value={username}>
            <chngUsernameContext.Provider value={chngUsername}>
            {children}
            </chngUsernameContext.Provider>
            </usernameContext.Provider>
            </chngSigninContext.Provider>
    </signinContext.Provider>
}