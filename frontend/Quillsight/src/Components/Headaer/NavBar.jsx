import React from 'react'

function NavBar() {
  return (
    <div className="navbar bg-base-100" style={{backgroundColor:"#a0e646"}}>
      
      lol
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
            style={{borderRadius:"25px"}}/>
            
        </div>
      
      
    
    <div className="flex-1">
    <a className="btn btn-ghost text-xl">Quillasight</a>
  </div>
  <button className="btn" style={{marginRight: "20px", backgroundColor:"#0B7EC1", color:"white", borderRadius:"25px", width:"100px"}}>Sign-up</button>
  <button className="btn" style={{backgroundColor:"#0B7EC1", color:"white", borderRadius:"25px", width:"100px"}}>Login</button>
</div>
  )
}

export default NavBar