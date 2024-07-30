import React from "react"
import NavBar from "./Components/Headaer/NavBar"
import { Outlet } from 'react-router-dom'

function App() {

  return (

   <main>
    <NavBar/>
    <Outlet />
   </main>
  )
   
}

export default App
