import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../index';
import Navbar from './navbar';
import AddPostBtn from './add_post_btn';
import FriendsList from './friends_list';
import ThreadBox from './thread';
import { Footer } from './footer';

const Home = () => {
  const [postsList, setPostsList] = useState([]);

  // fetch the post information from firebase storage by id.
  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);
      setPostsList(postsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchPosts();
  }, []);

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
            {postsList.map(post =>
              post.title && post.message && post.postedBy ?
                <ThreadBox
                  key={post.id}
                  title={post.title}
                  message={post.message}
                  postedBy={post.postedBy}
                  id={post.id}
                />
                : null
            )}
            <ThreadBox title="Message Title 2" message="Message 2" postedBy="User 2" isDeleted={true}/>
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









