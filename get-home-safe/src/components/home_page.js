import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../index';
import Navbar from './navbar';
import AddPostBtn from './add_post_btn';
import FriendsList from './friends_list';
import ThreadBox from './thread';
import { Footer } from './footer';
import DeletedPost from './deleted_post';

const Home = () => {
  const [postsList, setPostsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const postsQuery = query(collection(db, 'posts'), orderBy("postTime", "desc"));
      const postsSnapshot = await getDocs(postsQuery);
      const fetchedPosts = postsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      // Filter the posts based on the searchTerm
      const filteredPosts = fetchedPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setPostsList(filteredPosts);
    };

    fetchPosts();
  }, [searchTerm]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <>
      <header>
        <Navbar onSearchSubmit={setSearchTerm} />
      </header>
      <body>
        <main>
          <h1>UW Get Home Safe Community Forum</h1>
          <AddPostBtn />
          <div className="container">
            <FriendsList />
            <div className="threads">
              {postsList.length === 0 ? (
                <p>No posts match the search term. Try Again.</p>
              ) : (
                postsList.map(post =>
                  post.title && post.message && post.postedBy && post.postTime ?
                    <ThreadBox
                      key={post.id}
                      title={post.title}
                      message={post.message}
                      postedBy={post.postedBy}
                      postTime={post.postTime}
                      id={post.id}
                    />
                    : null
                )
              )}
            </div>
          </div>
        </main>
      </body>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;














