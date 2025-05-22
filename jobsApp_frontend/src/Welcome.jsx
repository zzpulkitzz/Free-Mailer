import { useState } from 'react'
import { Mail, User, Lock, Send, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useNavigate} from "react-router-dom"
import { chngSigninContext, signinContext,usernameContext,
  chngUsernameContext } from "./SigninProvider.jsx"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useContext } from 'react'
import {Link} from "react-router-dom"
export default function Welcome() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const chngUsername=useContext(chngUsernameContext)
  const history=useNavigate()
  const handleSubmit = () => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', { email, username, password })
  }

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
    let formDict2={}
    for(const [key,value] of formItrt2){
        formDict2[key]=value
    }
    console.log(formDict2)
    const response=await sendData("https://jobs-app-y9bs.onrender.com/users/signup",formDict2)
    console.log(response)
    if(response){
      console.log("succesful response")
      chngUsername(response.user.name)
      localStorage.setItem("UserName",response.user.name)
      let id=response.user._id
      history(`/jobs?userId=${id}`)
    }
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-12 pb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Land Your Dream Job Faster with <br />
          <span className="text-[#5B9BFF]">Automated Outreach</span>
        </h1>
        <p className="text-lg md:text-xl text-black mb-8 max-w-2xl mx-auto">
          Send personalized emails to HR managers at lightning speed.<br />
          Let us automate your job search and get you noticed by top companies — effortlessly.
        </p>
        <Link className="bg-[#5B9BFF] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#488be0] transition mb-16" to="/jobs">
          Start Sending Emails Now
        </Link>
        {/* Feature Cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-5xl">
          {/* Card 1 */}
          <div className="flex-1 bg-[#F5F9FF] rounded-xl shadow-md p-8 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#5B9BFF" className="w-10 h-10 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21l16.5-9-16.5-9v7.5l11.25 1.5-11.25 1.5V21z" />
            </svg>
            <h3 className="font-bold text-lg mb-2 text-black text-center">Automated<br />Personalized Emails</h3>
            <p className="text-gray-600 text-center">Our system crafts and sends custom emails to HRs, saving you hours of manual work.</p>
          </div>
          {/* Card 2 */}
          <div className="flex-1 bg-[#F5F9FF] rounded-xl shadow-md p-8 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#5B9BFF" className="w-10 h-10 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              <rect x="4" y="4" width="16" height="16" rx="4" stroke="#5B9BFF" strokeWidth="1.5" fill="none" />
            </svg>
            <h3 className="font-bold text-lg mb-2 text-black text-center">Direct HR<br />Connections</h3>
            <p className="text-gray-600 text-center">Reach hiring managers directly and maximize your chances of landing interviews.</p>
          </div>
          {/* Card 3 */}
          <div className="flex-1 bg-[#F5F9FF] rounded-xl shadow-md p-8 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#5B9BFF" className="w-10 h-10 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2M8 12l4 4 4-4M12 4v12" />
            </svg>
            <h3 className="font-bold text-lg mb-2 text-black text-center">Track Your Progress</h3>
            <p className="text-gray-600 text-center">Monitor email opens, replies, and get insights to optimize your job search strategy.</p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-[#F5F9FF] p-4 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#5B9BFF" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21l16.5-9-16.5-9v7.5l11.25 1.5-11.25 1.5V21z" />
            </svg>
            <span className="text-lg font-bold text-[#5B9BFF]">Mail</span>
          </div>
          <div className="text-gray-500 text-sm text-center">© 2024 JobMail. All rights reserved.</div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-[#5B9BFF] hover:text-[#488be0]"><svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.15c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.39-.22-1.98-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0024 4.59a8.48 8.48 0 01-2.54.7z"/></svg></a>
            <a href="#" className="text-[#5B9BFF] hover:text-[#488be0]"><svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg></a>
            <a href="#" className="text-[#5B9BFF] hover:text-[#488be0]"><svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.64-2.8 5.67-5.47 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58 4.64-.86 8.24-4.52 8.24-8.93 0-5.5-4.46-9.96-9.96-9.96z"/></svg></a>
          </div>
        </div>
      </footer>
    </div>
  )
}