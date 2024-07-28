import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../Zustand/userInfoStore';
import { motion } from 'framer-motion';
import useBlogStore from '../Zustand/userBlogs';
import axios from 'axios';


const Profile = () => {
  const user = useUserStore((state) => state.userData);
  const createdBlogStore = useBlogStore()
  const createdBlogs = useBlogStore((state)=>state.createdBlogs)
  const savedBlogs = useBlogStore((state)=>state.savedBlogs)

  const [activeTab, setActiveTab] = useState('created');
  const navigate = useNavigate();
  useEffect((()=>{
    const fetchAllUpdate = async()=>{
      try {
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
        
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllUpdate();
  }),[])

  // Dummy data for created and saved posts
  /*const createdPosts = [
    { id: 1, title: 'My First Blog', content: 'This is my first blog post', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Technology' },
    { id: 2, title: 'Travel Adventures', content: 'Exploring new places', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Travel' },
    { id: 3, title: 'Cooking Tips', content: 'Easy recipes for beginners', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Food' },
    { id: 4, title: 'Fitness Guide', content: 'Stay healthy with these exercises', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Health' },
    { id: 5, title: 'Tech Innovations', content: 'Latest trends in technology', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Tech' },
    { id: 6, title: 'Gardening Tips', content: 'How to start your own garden', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Lifestyle' },
    { id: 7, title: 'Book Reviews', content: 'Review of the latest books', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Books' },
    { id: 8, title: 'Travel Tips', content: 'Travel smarter with these tips', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Travel' },
    { id: 9, title: 'Photography Basics', content: 'Getting started with photography', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Photography' },
    { id: 10, title: 'Healthy Eating', content: 'Tips for a balanced diet', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Health' },
  ];

  const savedPosts = [
    { id: 11, title: 'Personal Finance', content: 'Manage your money effectively', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Finance' },
    { id: 12, title: 'Home Décor', content: 'Stylish ideas for home improvement', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Home' },
    { id: 13, title: 'Digital Marketing', content: 'Strategies for online marketing', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Marketing' },
    { id: 14, title: 'Career Growth', content: 'Tips for professional development', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Career' },
    { id: 15, title: 'Mindfulness', content: 'Practices for mental well-being', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Lifestyle' },
    { id: 16, title: 'Gadget Reviews', content: 'In-depth reviews of the latest gadgets', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Tech' },
    { id: 17, title: 'Language Learning', content: 'Effective methods to learn new languages', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Education' },
    { id: 18, title: 'Social Media Tips', content: 'Grow your social media presence', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Social Media' },
    { id: 19, title: 'Cooking Techniques', content: 'Master various cooking methods', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Food' },
    { id: 20, title: 'Health and Fitness', content: 'Stay fit and healthy with these tips', image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', category: 'Health' },
  ];*/

  const handleCardClick = (id) => {
    console.log(id);
    navigate(`/dashboard/blog/${id}`)
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
              src={post.image}
              alt={post.tittle}
              className="w-full h-32 object-cover"
            />
          </figure>
          <div className="card-body p-3">
            <h2 className="card-title text-base">{post.tittle}</h2>
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
        <img src={user.avtar} alt={user.fullname} className="w-full h-full rounded-full object-cover" />
      </div>
      <h2 className="mt-4 text-xl font-bold">{user.fullname}</h2>
      <p className="text-gray-600">{user.bio}</p>
      {/*<div className="mt-4">
        <span className="mr-4">6 followers</span>
        <span>6 following</span>
      </div>*/}
      <div className="mt-4 flex justify-center space-x-4">
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'created' ? 'bg-green-500 text-white' : 'bg-green-300'}`}
          onClick={() => setActiveTab('created')}
          style={{backgroundColor:"#94DF34", color:"black", borderRadius:"20px"}}
        >
          Created
        </button>
        <Link to="/addBlog" className="bg-black text-white px-4 py-2 rounded" style={{fontWeight:"bolder", borderRadius:"25px"}}>+</Link>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'saved' ? 'bg-green-500 text-white' : 'bg-green-300'}`}
          onClick={() => setActiveTab('saved')}
          style={{backgroundColor:"#94DF34", color:"black", borderRadius:"20px"}}
        >
          Saved
        </button>
        {console.log(createdBlogs)}
        {console.log(savedBlogs)}
      </div>
      <br /><hr/>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2" >
        {activeTab === 'created' ? renderPosts(createdBlogs[0]) : renderPosts(savedBlogs[0])}
      </div>
    </div>
  );
};

export default Profile;
