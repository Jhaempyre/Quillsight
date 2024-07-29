import React, { useEffect } from 'react';
import Category from '../Components/Category.jsx';
import Preview from '../Components/Preview.jsx';
import axios from 'axios';
import useBlogStore from '../Zustand/userBlogs.js'; // Update this path

function DashBoard() {
  const topics = [
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
    'love',
    'Environment and Sustainability',
    'Art and Culture'
  ];

  const { allPosts, setAllPosts } = useBlogStore();
  const [selectedTopic, setSelectedTopic] = React.useState(topics[0]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    console.log(topic);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Getting posts");
        const response = await axios.get('https://quillsight.onrender.com/api/v1/post/getAllPost');
        setAllPosts(response.data.data);
        console.log("set", allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [setAllPosts]);

  // Filter posts based on selected topic
  const filteredPosts = allPosts.filter(post => post.category === selectedTopic);

  return (
    <div className="flex gap-6 p-6 bg-gray-200 min-h-screen" style={{backgroundColor:"#E8FFCC"}}>
      <div className="flex-none">
        <Category
          topics={topics}
          onTopicSelect={handleTopicSelect}
          selectedTopic={selectedTopic}
        />
      </div>
      <div className="flex-grow">
        <Preview selectedTopic={selectedTopic} posts={filteredPosts} />
      </div>
    </div>
  );
}

export default DashBoard;
