import { useState } from 'react';
import axios from 'axios';
import useUserStore from '../Zustand/userInfoStore.js';
import { useNavigate } from 'react-router-dom';
import useBlogStore from '../Zustand/userBlogs.js';

// Create an axios instance with the correct configuration
const api = axios.create({
  baseURL: 'https://quillsight.onrender.com/api/v1',
  withCredentials: true, // This is crucial for sending and receiving cookies
});

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const loggedUser = useUserStore((state) => state.loggedUser);
    const authStatus = useUserStore((state) => state.authStatus);
    const navigate = useNavigate();
    const createdBlogStore = useBlogStore();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post('/user/loginUser', { email, password });

            // Log cookies to check if they're set
            console.log('Cookies after login:', document.cookie);

            const getCreatedBlog = await api.get('/post/getyourpost');
            const getSavedBlog = await api.get("/post/savedpost");

            if (getCreatedBlog.data.error) {
                throw new Error(getCreatedBlog.data.error);
            }
            if (getSavedBlog.data.error) {
                throw new Error(getSavedBlog.data.error);
            }

            const createdPosts = getCreatedBlog.data.data || [];
            const savedPosts = getSavedBlog.data.data.savedItems || [];

            createdBlogStore.getCreatedUpdate(createdPosts);
            createdBlogStore.getSavedUpdate(savedPosts);

            setIsLoading(false);

            loggedUser(response.data.data.loggedUser);
            authStatus(true);
            navigate('/dashboard/profile');

            return true; // Login successful
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.message || 'An error occurred during login');
            console.error('Login error:', err);
            return false; // Login failed
        }
    };

    return { login, isLoading, error };
};

export default useLogin;