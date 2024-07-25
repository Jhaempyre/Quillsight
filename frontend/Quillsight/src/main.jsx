import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import NavBar from './Components/Headaer/NavBar.jsx'
import HomePage from './Pages/HomePage.jsx'
import DashBoard from './Pages/DashBoard.jsx'
import AddBlog from './Pages/AddBlog.jsx'
import ProfilePage from './Pages/ProfilePage.jsx'
import TopicWise from './Pages/TopicWise.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children : [
      {
        path : '/home',
        element :(
            <HomePage/>
        )
      },
      {
        path : '/dashboard',
        element :(
          
            <DashBoard/>
            
        )
      },
      {
        path : '/addBlog',
        element : (
          
            <AddBlog/>
          
        )
      },
      {
        path : '/dashboard/profile',
        element : ( 
                                 
                <ProfilePage/>
           
          )
      },
      {
        path : '/dashboard/topic',
        element : ( 
                                   
                <TopicWise/>
               
          )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
