import React, { useState } from 'react'
import Category from '../Components/Category.jsx'
import Preview from '../Components/Preview.jsx'

function DashBoard() {
  const topics = ["Technology", "Science", "Art", "Music", "Sports", "Food", "Travel", "Fashion", "Health", "Education"];
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="flex gap-6 p-6 bg-gray-200 min-h-screen" style={{backgroundColor:"#E8FFCC"}}>
      <div className="flex-none" >
        <Category 
          topics={topics} 
          onTopicSelect={handleTopicSelect} 
          selectedTopic={selectedTopic}
        />
      </div>
      <div className="flex-grow" >
        <Preview selectedTopic={selectedTopic} />
      </div>
    </div>
  )
}

export default DashBoard