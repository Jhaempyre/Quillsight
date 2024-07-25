import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="text-center mt-8">
      <div className="w-24 h-24 bg-green-300 rounded-full mx-auto"></div>
      <h2 className="mt-4 text-xl font-bold">name</h2>
      <p className="text-gray-600">bio.....................</p>
      <p className="text-gray-600">.............................</p>
      <div className="mt-4">
        <span className="mr-4">6 followers</span>
        <span>6 following</span>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button className="bg-green-300 px-4 py-2 rounded">created</button>
        <Link to="/createBlog" className="bg-black text-white px-4 py-2 rounded">+</Link>
        <button className="bg-green-300 px-4 py-2 rounded">saved</button>
      </div>
    </div>
  );
};

export default Profile;