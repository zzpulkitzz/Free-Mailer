import { useContext,createContext, useState } from "react";
export const signinContext=createContext()
export const chngSigninContext=createContext()
export const usernameContext=createContext()
export const chngUsernameContext=createContext() 
export default function SigninProvider({children}){

    const [isSignin,setIsSignin]=useState(true)
    const [username,setUsername]=useState(null)
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