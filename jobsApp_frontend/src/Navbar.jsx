import {Outlet,Link} from "react-router-dom"
import SigninProvider  from './SigninProvider.jsx'
import LoginButtton from "./LoginButton"
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

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
        <header className="bg-white border-b border-gray-100 p-4 shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {/* Paper plane icon (Heroicons or similar) */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#5B9BFF" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21l16.5-9-16.5-9v7.5l11.25 1.5-11.25 1.5V21z" />
              </svg>
              <span className="text-xl font-bold text-[#5B9BFF]">FreeMailer</span>
            </div>
            <nav className="flex space-x-8 items-center">
              <Link to="/" className="text-black font-medium hover:text-[#5B9BFF]">Home</Link>
              <Link to="/features" className="text-black font-medium hover:text-[#5B9BFF]">Features</Link>
              <Link to="/community" className="text-black font-medium hover:text-[#5B9BFF]">Community</Link>
              <Link to="/contact" className="text-black font-medium hover:text-[#5B9BFF]">Contact Us</Link>
            </nav>
            
            <Link className=" text-black font-semibold px-6 py-2 hover:text-[#5B9BFF] " to="/signin">Sign In</Link>
            
          </div>
        </header>
        <Outlet />
      </div>
    </SigninProvider>
  )
}

export default Navbar
