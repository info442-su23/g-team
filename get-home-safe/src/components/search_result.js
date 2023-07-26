import React from 'react';
import Navbar from './navbar';
import AddPostBtn from './add_post_btn';
import FriendsList from './friends_list';
import ThreadBox from './thread';

const SearchResult = () => {
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
            <ThreadBox title="Message Title 1" message="Message 1 with search term" postedBy="User 1" />
            <ThreadBox title="Message Title 2" message="Message 2 with search term" postedBy="User 2" />
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchResult;