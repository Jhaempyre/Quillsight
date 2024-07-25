import React from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../../Zustand/userInfoStore.js';

function NavBar() {
  const { authStats, logout } = useUserStore();
  return (
    <div className="navbar bg-base-100" style={{backgroundColor:"#a0e646"}}>
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="http://res.cloudinary.com/du7ctzi61/image/upload/v1721811170/xeszxcosoqkp4thavm9j.png" 
            style={{borderRadius:"25px"}}/>
            
        </div>
      
      
    
    <div className="flex-1">
    <a className="btn btn-ghost text-xl">Quillasight</a>
  </div>
  {authStats ? (
            <button
              onClick={logout}
              className="bg-[#0B7EC1] text-white px-4 py-2 rounded-full w-24"
            >
              Logout
            </button>
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