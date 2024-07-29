import React from 'react'

export default function Preview({ selectedTopic }) {
  return (
    <div className="bg-gray-100 rounded-2xl p-8 shadow-lg w-full h-screen overflow-hidden flex flex-col" style={{backgroundColor:"#C1FF72"}}>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">{selectedTopic}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow overflow-y-auto">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img src="https://via.placeholder.com/300x200" alt="Preview" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Shoes!</h2>
              <p className="text-gray-600 mb-4">If a dog chews shoes whose shoes does he choose?</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}