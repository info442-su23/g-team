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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);
      const fetchedPosts = postsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      // Filter the posts based on the searchTerm
      const filteredPosts = fetchedPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setPostsList(filteredPosts);
    };

    fetchPosts();
  }, [searchTerm]);

  return (
    <>
      <header>
        <Navbar onSearchSubmit={setSearchTerm} />
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













