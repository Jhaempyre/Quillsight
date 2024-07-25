import React from 'react';
import Profile from '../Components/Profile';
import PostGrid from '../Components/Headaer/PostGrid';


const ProfilePage = () => {
  return (

      <div className="container mx-auto">
        <Profile />
        <PostGrid/>
      </div>
  );
};

export default ProfilePage;