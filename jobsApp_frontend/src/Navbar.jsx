import { useEffect } from 'react'
import { useState } from 'react'
import Jobs from "./Jobs"
import {Outlet,Link} from "react-router-dom"
import SigninProvider  from './SigninProvider.jsx'
import {signinContext,chngSigninContext,usernameContext} from "./SigninProvider"
import { useContext } from 'react'
import LoginButtton from "./LoginButton"
import { Mail, User, Lock, Send, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

function Navbar() {

  
  let style={display:"flex" ,justifyContent: "space-between",alignItems: "center",  }
  return (
    <SigninProvider>
      <div>

      <header className="bg-[rgb(86,52,243)]  text-white p-4">
        <div className="container mx-auto flex justify-between items-center ">
          <h1 className="text-2xl font-bold ">Jobbo</h1>
          <nav className=" md:flex space-x-4 w-[50vw] flex flex-row justify-between ">
            <a href="#" className="hover:text-purple-200">Home</a>
            <a href="#" className="hover:text-purple-200">Features</a>
            <a href="#" className="hover:text-purple-200">Pricing</a>
            <a href="#" className="hover:text-purple-200">Contact</a>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
              <LoginButtton/>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      

  


      <Outlet />
      
      </div>
      </SigninProvider>
      
  )
}

export default Navbar
