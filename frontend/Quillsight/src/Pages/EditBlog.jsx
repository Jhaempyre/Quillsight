import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://quillsight.onrender.com/api/v1',
  withCredentials: true, // This is crucial for sending and receiving cookies
});

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    tittle: '',
    content: '',
    category: '',
    image: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/post/${id}`);
        setBlog(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch blog post');
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setBlog({ ...blog, image: e.target.files[0] });
    } else {
      setBlog({ ...blog, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('tittle', blog.tittle);
      formData.append('content', blog.content);
      formData.append('category', blog.category);
      formData.append('postId', id);
      if (blog.image) {
        formData.append('image', blog.image);
      }

      const response = await axios.post('/post/editPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.statusCode === 200) {
        navigate('/dashboard/profile'); // Redirect to profile page after successful update
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(`Failed to update blog post: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tittle" className="block mb-1">Title</label>
          <input
            type="text"
            id="tittle"
            name="tittle"
            value={blog.tittle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">Content</label>
          <textarea
            id="content"
            name="content"
            value={blog.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="6"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={blog.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;