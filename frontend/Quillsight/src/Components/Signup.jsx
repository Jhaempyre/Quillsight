import React from 'react'

function Signup() {
  return (
    <div>
        <h1>Signup</h1>
        <input
  type="email"
  placeholder="Type your email"
  className="input input-bordered input-secondary w-full max-w-xs" />
  <input
  type="password"
  placeholder="Type your password"
  className="input input-bordered input-secondary w-full max-w-xs" />
  <button className="btn btn-primary">Primary</button>
    </div>

  )
}

export default Signup