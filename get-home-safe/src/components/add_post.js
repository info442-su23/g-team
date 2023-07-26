import React from 'react';
import Navbar from './navbar'
import FriendsList from './friends_list';
import PostForm from './post_form';

function AddPost() {
  return (
    <>
      <Navbar />
      <div className="container">
        <FriendsList />
        <PostForm />
      </div>
    </>
  );
};

export default AddPost;


