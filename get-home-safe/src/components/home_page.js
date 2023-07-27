import React from 'react';
import Navbar from './navbar';
import AddPostBtn from './add_post_btn';
import FriendsList from './friends_list';
import ThreadBox from './thread';
import { Footer } from './footer';

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <h1>UW Get Home Safe Community Forum</h1>
        <AddPostBtn />
        <div className="container">
          <FriendsList />
          <div className="threads">
            <ThreadBox title="Message Title 1" message="Message 1" postedBy="User 1" />
            <ThreadBox title="Message Title 2" message="Message 2" postedBy="User 2" isDeleted={true}/>
            <ThreadBox title="Message Title 3" message="Message 3" postedBy="User 3" />
            <ThreadBox title="Message Title 4" message="Message 4" postedBy="User 4" />
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;






