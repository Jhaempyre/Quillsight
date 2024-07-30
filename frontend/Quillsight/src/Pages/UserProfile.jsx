import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('created');
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = axios.create({
          baseURL: 'https://quillsight.onrender.com/api/v1',
          withCredentials: true, // This is crucial for sending and receiving cookies
        });
        const response = await axios.get(`/user/${username}`);
        
        console.log("API Response:", response.data);  // Log the entire response for debugging

        if (response.data && response.data.data) {
          const { user, posts } = response.data.data;
          setUser(user || {});
          setPosts(posts || []);
        } else {
          throw new Error('Invalid response data');
        }
      } catch (error) {
        console.log('Error fetching data:', error.message);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  const handleCardClick = (id) => {
    navigate(`/dashboard/blog/${id}`);
  };

  const renderPosts = (posts) => {
    return posts.map((post) => (
      <div className='ml-12' key={post._id}>
        <motion.div
          className="card card-compact bg-base-100 w-full sm:w-80 md:w-96 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => handleCardClick(post._id)}
        >
          <figure>
            <img
              src={post.avtar}
              alt={post.title}
              className="w-full h-32 object-cover"
            />
          </figure>
          <div className="card-body p-3">
            <h2 className="card-title text-base">{post.title}</h2>
            <p className="text-xs">{post.content}</p>
            <div className="card-actions justify-end mt-2">
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">{post.category}</span>
            </div>
          </div>
        </motion.div>
      </div>
    ));
  };

  return (
    <div className="text-center mt-8">
      <div className="w-24 h-24 mx-auto">
        <img src={user.avatar} alt={user.fullname} className="w-full h-full rounded-full object-cover" />
      </div>
      <h2 className="mt-4 text-xl font-bold">{user.fullname}</h2>
      <p className="text-gray-600">{user.bio}</p>
      <div className="mt-4 flex justify-center space-x-4">
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'created' ? 'bg-green-500 text-white' : 'bg-green-300'}`}
          onClick={() => setActiveTab('created')}
        >
          Created Blogs
        </button>
      </div>
      <br /><hr/>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {activeTab === 'created' && renderPosts(posts)}
      </div>
    </div>
  );
}

export default UserProfile;
