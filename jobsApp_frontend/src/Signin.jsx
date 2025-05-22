import {useEffect,useState,useContext} from "react"
import {useNavigate} from "react-router-dom"
import { chngSigninContext, signinContext,usernameContext,
    chngUsernameContext } from "./SigninProvider.jsx"
import { auth } from "./firebaseConfig";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getIdToken,
  } from "firebase/auth";
export default function Signin(prop){
    const isSignin=useContext(signinContext)
    const chngSignIn=useContext(chngSigninContext)
    const chngUsername=useContext(chngUsernameContext)
    const history=useNavigate()
    const [is_reg,set_is_reg]=useState(true)
    const [errMessage,setErrMessage]=useState()
    // Social login placeholder functions
    function onAppleLogin() { alert('Apple login coming soon!') }
    function onGoogleLogin() { alert('Google login coming soon!') }
    function onMicrosoftLogin() { alert('Microsoft login coming soon!') }

    async function sendData(fetchUrl,postData){
        try{
            let response=await fetch(fetchUrl,{
            method:"POST",
            headers:{"Content-type":"application/json",
                "Authorization":`Bearer ${postData.token}`
            },
            body: JSON.stringify({uid:postData.uid,email:postData.email})
        })
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
        let name= formData.get("name")
        let email= formData.get("email")
        let password= formData.get("password")
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await getIdToken(userCredential.user);
        const uid=userCredential.user.uid
        const response = await sendData("https://jobs-app-y9bs.onrender.com/users/signin",{uid,email,token});
        if(response && response.status==200){
            history(`/jobs?userId=${uid}`)
        }else{
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
        let formDict2={}
        for(const [key,value] of formItrt2){
            formDict2[key]=value
        }
        let response=await sendData("https://jobs-app-y9bs.onrender.com/users/signin",formDict2)
        if(response.status==200){
            chngUsername(response.user.name)
            localStorage.setItem("UserName",response.user.name)
            localStorage.setItem("token",response.token)
            let id=response.id
            history(`/jobs?userId=${id}`)
            chngSignIn(true)
            localStorage.setItem("signIn",true)
        }else{
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
        let err=document.getElementsByClassName("err")[0]
        blinkError(err)
    }
    window.addEventListener("storage",(event)=>{
        let signIn=localStorage.getItem("signIn")
        if(signIn==="true"){
            history("/jobs")
        }if(signIn==="false"){
            history("/signin")
        }
    })
    return (
    <div className="flex min-h-screen">
      {/* Left: Form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-6 md:px-16 py-12 bg-white">
        <div className="max-w-md w-full mx-auto">
         
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">{is_reg ? 'Sign in to your account' : 'Get started with a Free plan'}</h1>
          <p className="text-gray-700 mb-8">{is_reg ? 'Welcome back! Please sign in to continue.' : 'Sign up in seconds. No credit card required.'}</p>
          <form className="form space-y-5" onSubmit={is_reg ? onSignin : onSignup}>
            {!is_reg && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-black mb-1">Company or Organization</label>
                <input id="company" name="company" type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ed760]" />
              </div>
            )}
            {!is_reg && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-1">Name</label>
                <input id="name" name="name" type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ed760]" />
              </div>
            )}
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-black mb-1">Email address</label>
              <input id="userName" name="userName" type="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ed760]" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">Password</label>
              <input id="password" name="password" type="password" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ed760]" required />
            </div>
            {/* Password requirements (always show for register, optional for signin) */}
            {!is_reg && (
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600 mb-2">
                <div className="flex items-center"><span className="mr-2 text-[#1ed760]">●</span>One lowercase character</div>
                <div className="flex items-center"><span className="mr-2 text-[#1ed760]">●</span>One uppercase character</div>
                <div className="flex items-center"><span className="mr-2 text-[#1ed760]">●</span>One number</div>
                <div className="flex items-center"><span className="mr-2 text-[#1ed760]">●</span>8 characters minimum</div>
              </div>
            )}
            {!is_reg && (
              <div className="text-xs text-gray-500 mb-2">By clicking, you agree to <a href="#" className="underline">Terms of Use</a>, <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Anti-Spam Policy</a>.</div>
            )}
            <button type="submit" className="w-full bg-[#5B9BFF] text-white font-semibold py-3 rounded text-lg hover:bg-[#19c150] transition">{is_reg ? 'Sign in' : 'Create my account'}</button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="space-y-3">
            <button onClick={onAppleLogin} className="w-full flex items-center justify-center border border-gray-300 rounded py-2 text-black font-medium text-base hover:bg-gray-50 transition">
              <span className="mr-2 text-xl"></span> Sign in with Apple
            </button>
            <button onClick={onGoogleLogin} className="w-full flex items-center justify-center border border-gray-300 rounded py-2 text-black font-medium text-base hover:bg-gray-50 transition">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.13 13.13 17.57 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.98 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.13a14.5 14.5 0 010-8.26l-7.98-6.2A23.97 23.97 0 000 24c0 3.77.9 7.34 2.69 10.56l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.18 0 11.36-2.05 15.15-5.57l-7.19-5.59c-2 1.34-4.56 2.13-7.96 2.13-6.43 0-11.87-3.63-14.33-8.94l-7.98 6.2C6.73 42.52 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
              Sign in with Google
            </button>
            <button onClick={onMicrosoftLogin} className="w-full flex items-center justify-center border border-gray-300 rounded py-2 text-black font-medium text-base hover:bg-gray-50 transition">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><g><rect fill="#F25022" x="1" y="1" width="10" height="10"/><rect fill="#7FBA00" x="13" y="1" width="10" height="10"/><rect fill="#00A4EF" x="1" y="13" width="10" height="10"/><rect fill="#FFB900" x="13" y="13" width="10" height="10"/></g></svg>
              Sign in with Microsoft
            </button>
          </div>
          <div className="mt-6 text-center text-sm">
            {is_reg ? (
              <>Not a member yet? <span className="text-[#5B9BFF] cursor-pointer" onClick={onRegister}>Register</span></>
            ) : (
              <>Already a user? <span className="text-[#1ed760] cursor-pointer" onClick={()=>set_is_reg(true)}>Sign in</span></>
            )}
          </div>
          <div className="err mt-4 opacity-0 text-red-400 text-center">{errMessage}</div>
        </div>
      </div>
      {/* Right: Features */}
      <div className="hidden md:flex flex-col justify-center w-1/2 bg-[#d3f5e7] px-10">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">Try Advanced features for 30 days</h2>
          <p className="mb-6 text-black">Your 30-day trial of Advanced features includes:</p>
          <ul className="space-y-5 text-lg">
            <li className="flex items-start"><span className="mt-1 mr-3 text-[#1ed760]">✔</span><span><b>Access to premium features</b><br /><span className="text-base text-gray-700">Live chat support, template library, promotion pop-ups, AI writing assistant and more</span></span></li>
            <li className="flex items-start"><span className="mt-1 mr-3 text-[#1ed760]">✔</span><span><b>Access to main features</b><br /><span className="text-base text-gray-700">Email automation, landing pages, website builder and more</span></span></li>
            <li className="flex items-start"><span className="mt-1 mr-3 text-[#1ed760]">✔</span><span><b>Up to 1,000 subscribers</b><br /><span className="text-base text-gray-700">Import up to 1,000 for free during your trial</span></span></li>
            <li className="flex items-start"><span className="mt-1 mr-3 text-[#1ed760]">✔</span><span><b>Send up to 12,000 emails</b></span></li>
            <li className="flex items-start"><span className="mt-1 mr-3 text-[#1ed760]">✔</span><span><b>24/7 live chat support for up to 30 days</b> <span className="ml-1 text-gray-500 text-base">&#9432;</span></span></li>
          </ul>
        </div>
      </div>
    </div>
    )
}