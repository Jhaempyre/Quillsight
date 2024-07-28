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
import SignUp from './Components/SignUp.jsx'
import Login from './Components/Login.jsx'
import BlogPost from './Pages/BlogPost.jsx'
import UserProfile from './Pages/UserProfile.jsx'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children : [
      {
        path : '/',
        element :(
            <HomePage/>
        )
      },
      {
        path : '/signup',
        element :(
            <SignUp/>
        )
      },
      {
        path : '/login',
        element :(
            <Login/>
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
      },
      {
        path : '/dashboard/:id',
        element : (
          <BlogPost/>
        )

      },
      {
        path : '/dashboard/:username',
        element : (
          <UserProfile/>
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
