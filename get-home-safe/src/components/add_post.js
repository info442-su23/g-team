import React from 'react';
import Navbar from './navbar'
import FriendsList from './friends_list';
import PostForm from './post_form';

/* Code for the Add Post page that users can add new posts.
Necessary functions has been imported for display. */

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


