import React from 'react';
import Navbar from './navbar'
import FriendsList from './friends_list';
import PostForm from './post_form';
import { Footer } from './footer';

/* Code for the Add Post page that users can add new posts.
Necessary functions has been imported for display. */

function AddPost() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <body>
        <div className="container">
          <FriendsList />
          <PostForm />
        </div>
      </body>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AddPost;


