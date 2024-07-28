import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/post/${id}`);
        setPost(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching the post.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!post) return <div className="text-center mt-20">Post not found.</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="relative h-96">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-70"></div>
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
            <span className="text-sm font-semibold text-gray-800">{post.category}</span>
          </div>
        </div>
        
        <div className="px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <div className="flex items-center">
              <img 
                src={post.authorAvatar} 
                alt={post.author} 
                className="w-12 h-12 rounded-full mr-4"
              />
              <span className="text-xl text-gray-700">{post.author}</span>
            </div>
            <span className="text-gray-500 italic">{new Date(post.date).toLocaleDateString()}</span>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-100 rounded-lg shadow-inner">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">About the Author</h3>
            <p className="text-gray-700 italic">{post.authorBio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;