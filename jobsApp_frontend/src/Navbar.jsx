import { useEffect } from 'react'
import { useState } from 'react'
import Jobs from "./Jobs"
import {Outlet,Link} from "react-router-dom"
import SigninProvider  from './SigninProvider.jsx'
import {signinContext,chngSigninContext,usernameContext} from "./SigninProvider"
import { useContext } from 'react'
import LoginButtton from "./LoginButton"

function Navbar() {

  
  let style={display:"flex" ,justifyContent: "space-between",alignItems: "center",  }
  return (
    <SigninProvider>
      <div>
      <header style={style} className="pl-[10vw] pr-[10vw] h-[12vh] bg-white">
  <h1>
  <span className='font-bold text-[rgb(86,52,243)]'> Jobs </span>
  <span className='font-bold'>App</span></h1>
  
  <LoginButtton/>
</header>
      <Outlet />
      </div>
      </SigninProvider>
      
  )
}

export default Navbar
