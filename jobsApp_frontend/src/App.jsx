import {RouterProvider,createRoutesFromElements,createBrowserRouter,BrowserRouter , Routes,Route, Link,redirect,defer,Navigate} from 'react-router-dom'
import Navbar from "./Navbar"
import Welcome from "./Welcome"
import Signin from "./Signin"

import Jobs from "./Jobs"
export default function App(){
    return <RouterProvider router={createBrowserRouter(createRoutesFromElements(

        <Route>
        <Route path="/" element={<Navbar/>}>
        <Route index element={<Welcome/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        </Route>
        </Route>
))} />

}
