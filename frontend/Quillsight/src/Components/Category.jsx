import React from 'react'

export default function Category({ topics, onTopicSelect, selectedTopic }) {
  return (
    <div className="bg-green-400 rounded-2xl p-6 shadow-lg max-w-xs h-screen overflow-hidden flex flex-col" style={{backgroundColor:"#94DF34"}}>
      <h2 className="text-white text-2xl font-bold mb-6 text-center">Topics</h2>
      <div className="flex flex-col space-y-3 flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-300" style={{backgroundColor:"#C1FF72"}}>
        {topics.map((topic, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded-full text-white font-semibold transition-all duration-300 ${
              selectedTopic === topic
                ? 'bg-green-700 shadow-md'
                : 'bg-green-500 hover:bg-green-600 hover:-translate-y-0.5'
            }`}
            onClick={() => onTopicSelect(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  )
}