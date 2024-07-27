import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Input = ({ label, type, value, onChange, placeholder, name }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
  </div>
);

// Textarea component for longer text inputs
const Textarea = ({ label, value, onChange, placeholder, name }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <textarea
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
  </div>
);

const categories = [
  'Technology',
  'Travel',
  'Health and Fitness',
  'Food and Cooking',
  'Fashion',
  'Personal Development',
  'Parenting',
  'Finance',
  'DIY and Crafts',
  'Lifestyle',
  'Business and Entrepreneurship',
  'Politics and Current Affairs',
  'Education',
  'Fitness',
  'Beauty',
  'Home and Garden',
  'Sports',
  'Entertainment',
  'Environment and Sustainability',
  'Art and Culture'
];

// Select component for category selection
const Select = ({ label, value, onChange, options, name }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={name}
      value={value}
      onChange={onChange}
      name={name}
    >
      <option value="">Select a category</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Image preview component
const ImagePreview = ({ file }) => {
  if (!file) return null;

  return (
    <div className="mt-4">
      <img
        src={URL.createObjectURL(file)}
        alt="Preview"
        className="max-w-full h-auto max-h-64 rounded-lg shadow-lg"
      />
    </div>
  );
};

function AddBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend
    console.log('Form submitted:', formData);
    // For now, let's just navigate back to the profile page
    navigate('/profile');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(http://res.cloudinary.com/du7ctzi61/image/upload/v1721813453/xw70m6whtih40pnqfbr8.png)' }}
    >
      <div className="max-w-3xl w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl bg-opacity-90 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create a New Blog</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your blog title"
            name="title"
          />
          <Select
            label="Category"
            value={formData.category}
            onChange={handleChange}
            options={categories}
            name="category"
          />
          <Textarea
            label="Content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here"
            name="content"
          />
          <Input
            label="Image"
            type="file"
            onChange={handleChange}
            name="image"
            accept="image/*"
          />
          <ImagePreview file={formData.image} />
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
