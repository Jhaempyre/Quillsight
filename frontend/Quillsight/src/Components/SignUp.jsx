 // SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignUp from '../Hooks/useSignUp.js';


function SignUp() {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    email: '',
    bio: '',
    avtar: null
  });
  const navigate = useNavigate();
  const { signUp, isLoading, error } = useSignUp();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      avtar: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const success = await signUp(formData);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style={{backgroundColor:"#E8FFCC"}}>
      <div className="max-w-md w-full space-y-8" style={{backgroundColor:"#C1FF72", maxHeight:"570px", maxWidth:"600px", paddingLeft:"10px", paddingRight:"10px", borderRadius:"20px"}}>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900" >Sign up for an account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" style={{borderRadius:"10px"}} />
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" style={{borderRadius:"10px"}} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" style={{borderRadius:"10px"}} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" style={{borderRadius:"10px"}} />
          
          <textarea name="bio" placeholder="Bio" onChange={handleChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" style={{borderRadius:"10px"}} />
          <div style={{marginBottom:"0px"}}><p style={{fontSize:"14px", marginLeft:"10px", fontWeight:"bold"}}>Upload Your Profile</p>
          <input type="file" name="avtar"  onChange={handleImageChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" style={{borderRadius:"10px"}} />
          </div>
          <button type="submit" disabled={isLoading} style={{backgroundColor:"#94DF34", color:"black", width:"200px", marginLeft:"25%", marginBottom:"20px"}} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;