// hooks/useSignUp.js
import { useState } from 'react';
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://quillsight.onrender.com/api/v1',
  withCredentials: true, // This is crucial for sending and receiving cookies
});

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/user/registerUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);
      return true; // Signup successful
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'An error occurred during signup');
      return false; // Signup failed
    }
  };

  return { signUp, isLoading, error };
};

export default useSignUp;