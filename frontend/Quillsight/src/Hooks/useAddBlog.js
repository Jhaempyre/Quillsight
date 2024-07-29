// hooks/useLogin.js
import { useState } from 'react';
import axios from 'axios';
import useUserStore from '../Zustand/userInfoStore.js';
import { useNavigate } from 'react-router-dom';
import useBlogStore from '../Zustand/userBlogs.js';


const useAddBlog = ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addBlog = async(formData)=>{
        setIsLoading(true);
        setError(null);

        try {
            console.log("sending blog data to backend")
            const response = await axios.post('https://quillsight.vercel.app/api/v1/post/addPost', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              console.log(response.data.data);
            
        } catch (error) {
            setIsLoading(false);
            setError(error.response?.data?.message || 'An error occurred during signup');
            return false; // Additon failed
        }
    } ;
    return { addBlog, isLoading, error };
}

export default useAddBlog