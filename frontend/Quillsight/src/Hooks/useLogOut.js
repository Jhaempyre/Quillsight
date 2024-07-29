// hooks/useLogout.js
import { useState } from 'react';
import axios from 'axios';
import useUserStore from '../Zustand/userInfoStore.js'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';


const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const logout = useUserStore((state) => state.logout);
  const authStatus = useUserStore((state) => state.authStatus);
  const navigate = useNavigate()

  const performLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Assuming you have a logout endpoint. If not, you can remove this API call.
      await axios.post('https://quillsight.vercel.app/api/v1/user/logout');
      
      // Clear the user data from the store
      logout();
      
      // Set the auth status to false
      authStatus(false);
      navigate("/")
      //**********************************************************have to remove post from zustand here ****************************************** */
      setIsLoading(false);
      return true; // Logout successful
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'An error occurred during logout');
      return false; // Logout failed
    } finally {
      // Even if the API call fails, we should still log out the user locally
      logout();
      authStatus(false);
    }
  };

  return { performLogout, isLoading, error };
};

export default useLogout;