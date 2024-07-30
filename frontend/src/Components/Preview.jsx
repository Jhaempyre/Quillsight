import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Preview({ selectedTopic, posts }) {
  const navigate = useNavigate()
  const onclickthing = (id)=>{
    console.log("ramayana")
    navigate(`/dashboard/blog/${id}`)
  }
  return (
    <div className="bg-gray-100 rounded-2xl p-8 shadow-lg w-full h-screen overflow-hidden flex flex-col" style={{backgroundColor:"#C1FF72"}}>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">{selectedTopic}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow overflow-y-auto">
        {posts.map((post) => (
          <div 
            key={post._id} 
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" 
            style={{height:"300px"}}
            onClick={() => onclickthing(post._id)}
          >
            <img src={post.image} alt={post.tittle} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.tittle}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
