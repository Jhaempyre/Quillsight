import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../../Zustand/userInfoStore.js';
import useLogout from '../../Hooks/useLogOut.js';


function NavBar() {
  const { authStats, logout } = useUserStore();
  const {performLogout, isLoading} = useLogout()
  const user = useUserStore((state) => state.userData);
  const navigate = useNavigate()
  const ClickHandler = ()=>{
    console.log("server")
    navigate("/dashboard")
  }
  const imageclick = ()=>{
    console.log("client")
    navigate("/dashboard/profile")
  }
  const logoutUser = async()=>{
    console.log("ho gya logout")
    await performLogout()
  }
  return (
    <div className="navbar bg-base-100" style={{backgroundColor:"#a0e646"}}>
        <div className="w-10 rounded-full">
          <img
            alt="logo"
            src="https://res.cloudinary.com/du7ctzi61/image/upload/v1722228689/WhatsApp_Image_2024-07-28_at_11.59.55_42e21000_irtzvr.jpg"
            style={{borderRadius:"25px"}}/>
            
        </div>
      
      
    
    <div className="flex-1">
    <a className="btn btn-ghost text-xl" onClick={()=>{ClickHandler()}}>Quillsight</a>
  </div>
  {authStats ? (
            <div>
              <div className="w-10 rounded-full">
          <img
            alt="photo"
            src = {user.avtar}
            style={{borderRadius:"25px"}}
            onClick={()=>{imageclick()}}/>
            
        </div>
        
            <button
              onClick={logoutUser}
              className="bg-[#0B7EC1] text-white px-4 py-2 rounded-full w-24 ml-2"
              style={{width:"85px"}}
            >
              Logout
            </button>
            </div>
          ) : (
            <div>
              <Link
                to="/signup"
                className="bg-[#0B7EC1] text-white px-4 py-2 rounded-full w-24 inline-block text-center mr-4"
              >
                Sign-up
              </Link>
              <Link
                to="/login"
                className="bg-[#0B7EC1] text-white px-4 py-2 rounded-full w-24 inline-block text-center"
              >
                Login
              </Link>
            </div>
          )}
</div>
  )
}

export default NavBar