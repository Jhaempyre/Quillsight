// hooks/useLogin.js
import { useState } from 'react';
import axios from 'axios';
import useUserStore from '../Zustand/userInfoStore.js';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const loggedUser = useUserStore((state) => state.loggedUser);
    const authStatus = useUserStore((state) => state.authStatus);
    const navigate = useNavigate()

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/v1/user/loginUser', { email, password });
      setIsLoading(false);
      // Here you might want to store the user's token in localStorage or context
      // Update the user data in the store
      console.log(response.data.data.loggedUser)
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