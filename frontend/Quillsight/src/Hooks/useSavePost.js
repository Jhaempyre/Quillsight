import React ,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useSavePost = ()=>{

    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const saveBlog = async(postId)=>{
    try {
        console.log("sending blog data to backend")
        console.log("hook",postId)
        const response = await axios.post('/api/v1/post/savepost', { id: postId }, {
            headers: {
              'Content-Type': 'application/json', // application/json is more suitable for sending JSON data
            },
          });
          console.log(response.data.data);
        
    } catch (error) {
        console.log(error.mesaage)
        setIsLoading(false);
        setError(error.response?.data?.message || 'An error occurred during saving post ');
        return false; // Additon failed
    }
  };
  return { saveBlog, isLoading, error };
    
}

export default useSavePost ;