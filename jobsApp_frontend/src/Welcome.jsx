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
    <div className="flex flex-col min-h-[90vh] bg-white">
    

      <main className="flex-grow flex flex-row md:flex-row ">
        <div className="w-full md:w-2/5 bg-blue-100  p-8">
          <h2 className="text-3xl font-bold mb-6 text-[rgb(86,52,243)] ">Sign Up</h2>
          <form onSubmit={handleSubmit} className="form space-y-4">
            
            <div>
              <Label htmlFor="name">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="johndoe"
                  className="pl-10"
                  name="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="userName">Gmail ID</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="userName"
                  type="email"
                  placeholder="your.email@gmail.com"
                  className="pl-10"
                  name="userName"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-[rgb(86,52,243)]  hover:bg-purple-700" onClick={onSignup}>
              <Send className="mr-2 h-4 w-4" /> Start sending Job Applications for free
            </Button>
          </form>
        </div>
        <div className="w-full md:w-3/5 bg-white p-8 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6 text-[rgb(86,52,243)] " >Automate Your Job Search</h1>
          <p className="text-2xl mb-6 text-gray-700">Jobbo helps you send personalized job applications to multiple companies with just a few clicks.</p>
         
        </div>
      </main>

      <footer className="bg-gray-100 p-4">
        <div className="container mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center text-[rgb(86,52,243)] ">Apply to Top Companies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook', 'Netflix', 'Tesla', 'IBM'].map((company) => (
              <span key={company} className="bg-white text-[rgb(86,52,243)]  px-3 py-1 rounded-full text-sm font-medium">
                {company}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}