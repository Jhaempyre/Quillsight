import React from 'react'
import Category from '../Components/Category.jsx'
import Preview from '../Components/Preview.jsx'

function DashBoard() {
  return (
    <div style={{display:"flex"}}>
      <div><Category/></div>
      <div><Preview/></div>
    </div>
  )
}

export default DashBoard