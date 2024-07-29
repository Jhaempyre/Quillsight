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
    const navigate = useNavigate();
    const user = useUserStore((state) => state.userData);
    const createdBlogStore = useBlogStore();
    const createdBlogs = useBlogStore((state) => state.createdBlogs);
    const savedBlogs = useBlogStore((state) => state.savedBlogs);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/v1/user/loginUser', { email, password });

            const getCreatedBlog = await axios.get('/api/v1/post/getyourpost');
            const getSavedBlog = await axios.get("/api/v1/post/savedpost");

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
            return false; // Login failed
        }
    };

    return { login, isLoading, error };
};

export default useLogin;
