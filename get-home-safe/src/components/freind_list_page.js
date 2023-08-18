import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../index';
import Navbar from './navbar';
import { Footer } from './footer';
import UserContext from './user_context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

function FriendsListPage() {
  const [friends, setFriends] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const fetchFriendsAndSuggestions = async () => {
      try {
        // Fetch current user document
        if (userId) {
          const userDocRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();

          // If the user document doesn't have a friends property, create an empty one
          if (!userData.friends) {
            await updateDoc(userDocRef, {
              friends: [],
            });
            userData.friends = [];
          }

          // Update the friend state
          setFriends(userData.friends);

          // Fetch all users to the suggested friends list
          const usersCollection = collection(db, 'users');
          const usersSnapshot = await getDocs(usersCollection);
          const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          // Make sure current user and current friends are not shown in the suggestion list
          const suggestedFriendsList = usersList.filter((user) => user.id !== userId && !userData.friends.some((friend) => friend.id === user.id)).slice(0, 5);
          setSuggestedFriends(suggestedFriendsList);
        }
      } catch (error) {
        console.error('Error fetching friends and suggestions:', error);
      }
    };

    fetchFriendsAndSuggestions();
  }, [userId]);

  // Function to search for friends by username
  const searchFriends = async (query) => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const filteredFriends = usersList.filter(
        (user) => user.id !== userId && user.username.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredFriends);
    } catch (error) {
      console.error('Error searching for friends:', error);
    }
  };

  // Call searchFriends whenever the searchQuery state changes
  useEffect(() => {
    searchFriends(searchQuery);
  }, [searchQuery]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Filter the suggestedFriends list based on the search query
    const filteredResults = suggestedFriends.filter((friend) => friend.username.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(filteredResults);
  };

  // Function to add a user as a friend
  const addFriend = async (friendId, friendUsername) => {
    if (userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        // If the friend isn't already added, add them to the list
        if (!userData.friends.some((friend) => friend.id === friendId)) {
          await updateDoc(userDocRef, {
            friends: arrayUnion({ id: friendId, username: friendUsername }),
          });
          // Update the local state
          setFriends([...friends, { id: friendId, username: friendUsername }]);
          setSuggestedFriends(suggestedFriends.filter((friend) => friend.id !== friendId));
          setSearchResults([]); // Clear search results after adding a friend
        }
      } catch (error) {
        console.error('Error adding friend:', error);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  // Function to unfriend a friend
  const unfriend = async (friendId) => {
    if (userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        // If the friend exists in the friend list, remove them
        if (userData.friends.some((friend) => friend.id === friendId)) {
          const updatedFriends = userData.friends.filter((friend) => friend.id !== friendId);
          await updateDoc(userDocRef, {
            friends: updatedFriends,
          });
          setFriends(updatedFriends);
          setSuggestedFriends([...suggestedFriends, userData.friends.find((friend) => friend.id === friendId)]);
        }
      } catch (error) {
        console.error('Error unfriending:', error);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  //Render
  return (
    <>
      <header>
        <Navbar />
      </header>
      <body>
        <div className="friends-list-page">
          <h2>Friends List</h2>
          <div className="search-bar-container" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Search friends..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            {searchQuery !== '' && (
                <div className="friend-search-results-container">
                  {searchResults.map((result) => (
                    <div key={result.id} className={`friend-search-results`}>
                      <span>{result.username}</span>
                      <div className="friend-actions">
                        <button className="add-friend-button" onClick={() => addFriend(result.id, result.username)}>
                          Add Friend
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>



          <div className="friends-page-container">
            <h3>Your Friends</h3>

            {friends.length === 0 && searchQuery === '' && (
              <div className="empty-friend-list">
                Your friend list is currently empty.
              </div>
              )}
            {friends.map((friend) => (
              <div key={friend.id} className={`friend ${friend.isBlocked ? 'blocked' : ''}`}>
                <span>{friend.username}</span>
                <div className="friend-actions">
                  <Link to={`/direct-message/${friend.id}`}>
                    <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '5px' }} />
                  </Link>
                  <button className="unfriend-button" onClick={() => unfriend(friend.id)}>
                    Unfriend
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="suggested-friends-page-container">
            <h3>Suggested Friends</h3>
            {suggestedFriends.map((suggestedFriend) => (
              <div key={suggestedFriend.id} className={`suggested-friend`}>
                <span>{suggestedFriend.username}</span>
                <div className="friend-actions">
                  <button className="add-friend-button" onClick={() => addFriend(suggestedFriend.id, suggestedFriend.username)}>
                    Add Friend
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </body>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default FriendsListPage;
