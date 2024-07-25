import React from 'react';

const dummyPosts = [
  { id: 1, image: 'https://via.placeholder.com/150', category: 'Tech', title: 'New Gadget' },
  { id: 2, image: 'https://via.placeholder.com/150', category: 'Travel', title: 'Beautiful Destination' },
  { id: 3, image: 'https://via.placeholder.com/150', category: 'Food', title: 'Delicious Recipe' },
  { id: 4, image: 'https://via.placeholder.com/150', category: 'Sports', title: 'Match Highlights' },
  { id: 5, image: 'https://via.placeholder.com/150', category: 'Music', title: 'New Album Release' },
  { id: 6, image: 'https://via.placeholder.com/150', category: 'Art', title: 'Exhibition Opening' },
];

const PostGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {dummyPosts.map((post) => (
        <div key={post.id} className="cursor-pointer">
          <img src={post.image} alt={post.title} className="w-full h-32 object-cover" />
          <p className="text-sm text-gray-600">{post.category}</p>
          <h3 className="font-bold">{post.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default PostGrid;