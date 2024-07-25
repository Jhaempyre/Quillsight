import React from 'react'

function Preview() {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
  <figure>
    <img 
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Blog" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Title</h2>
    <p>Blogs about.....</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Open</button>
    </div>
  </div>
</div>
  )
}

export default Preview