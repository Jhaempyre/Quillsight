// hooks/useLogin.js
import { useState } from 'react';
import axios from 'axios';
import useUserStore from '../Zustand/userInfoStore.js';
import { useNavigate } from 'react-router-dom';
import useBlogStore from '../Zustand/userBlogs.js';

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const loggedUser = useUserStore((state) => state.loggedUser);
    const authStatus = useUserStore((state) => state.authStatus);
    const navigate = useNavigate()
    const user = useUserStore((state) => state.userData);
    const createdBlogStore = useBlogStore()
    const createdBlogs = useBlogStore((state)=>state.createdBlogs)
    const savedBlogs = useBlogStore((state)=>state.savedBlogs)

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/v1/user/loginUser', { email, password });
      console.log("sending request to backend for getting all updates ")
        const getCreatedBlog = await axios.get('/api/v1/post/getyourpost')
        const getSavedBlog = await axios.get("/api/v1/post/savedpost")
        console.log("updates",getCreatedBlog);
        console.log("getCreatedBlog",getCreatedBlog.data.data)
        console.log("getSavedBlog",getSavedBlog);
        console.log("getSavedBlog",getSavedBlog.data.data)
        if (getCreatedBlog.data.error){
          console.log("error in getting updates",getCreatedBlog.data.error);
          throw new Error(getCreatedBlog.data.error)
        }
        if (getSavedBlog.data.error){
          console.log("error in getting updates",getSavedBlog.data.error);
          throw new Error(getSavedBlog.data.error)
        }
        createdBlogStore.getCreatedUpdate(getCreatedBlog.data.data)
        createdBlogStore.getSavedUpdate(getSavedBlog.data.data.savedItems)

      //console.log("touching created")
      //const created = await axios.get('/api/v1/post/getyourpost')
      //console.log("created done")
      setIsLoading(false);
      // Here you might want to store the user's token in localStorage or context
      // Update the user data in the store
      console.log(response.data.data.loggedUser)
      //console.log(created.data.data)
      loggedUser(response.data.data.loggedUser);
      
      // Update the auth status in the store
      authStatus(true);
      navigate('/dashboard/profile')
      
      return true; // Login successful
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'An error occurred during login');
      return false; // Login failed
    }
  };

  return { login, isLoading, error };
};

export default useLogin;