import React from 'react';
import FriendsList from './friends_list';
import Navbar from './navbar';
import { Footer } from './footer';


const DeletedPost = () => {
    return (
        <>
        <Navbar />
        <body>
          <div className="container">
            <FriendsList />
            <div className="message-detail-container">
              <div className="message-container">
                <h1>Post Deleted</h1>
                <div className="message-content">
                  <p>The following post has been deleted.</p>
                </div>
              </div>
            </div>
          </div>
        </body>
        <footer>
            <Footer />
        </footer>

    </>
    );
};

export default DeletedPost;

