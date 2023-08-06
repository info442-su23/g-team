import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../index';
import Navbar from './navbar';
import { Footer } from './footer';
import UserContext from './user_context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Set hooks for friends, suggested friends
function FriendsListPage() {
  const [friends, setFriends] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { userId } = useContext(UserContext);

  useEffect(() => {

    const fetchFriendsAndSuggestions = async () => {
      try {
        // Fetch current user document
        if (userId) {
          const userDocRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();

          // If the user document doesn't have a a friends property, create an empty one
          if (!userData.friends) {
            await updateDoc(userDocRef, {
              friends: [],
            });
            userData.friends = [];
          }

          // Update the freind state
          setFriends(userData.friends);

          // Fetch all user to the suggested friends list
          const usersCollection = collection(db, 'users');
          const usersSnapshot = await getDocs(usersCollection);
          const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          // Make sure current user and current friends are not shown in the suggestion list
          const suggestedFriendsList = usersList.filter((user) => user.id !== userId && !userData.friends.some((friend) => friend.id === user.id));
          setSuggestedFriends(suggestedFriendsList);
        }
      } catch (error) {
        console.error('Error fetching friends and suggestions:', error);
      }
    };

    fetchFriendsAndSuggestions();
  }, [userId]);

  // function to add a user as a friend
  const addFriend = async (friendId, friendUsername) => {
    if (userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        //If the friend isn't already added, add them to the list
        if (!userData.friends.some(friend => friend.id === friendId)) {
          await updateDoc(userDocRef, {
            friends: arrayUnion({ id: friendId, username: friendUsername }),
          });
          // Update the local state
          setFriends([...friends, { id: friendId, username: friendUsername }]);
          setSuggestedFriends(suggestedFriends.filter(friend => friend.id !== friendId));
        }
      } catch (error) {
        console.error("Error adding friend:", error);
      }
    } else {
      console.error("No user is logged in");
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
        if (userData.friends.some(friend => friend.id === friendId)) {
          const updatedFriends = userData.friends.filter((friend) => friend.id !== friendId);
          await updateDoc(userDocRef, {
            friends: updatedFriends,
          });
          setFriends(updatedFriends);
          setSuggestedFriends([...suggestedFriends, userData.friends.find((friend) => friend.id === friendId)]);
        }
      } catch (error) {
        console.error("Error unfriending:", error);
      }
    } else {
      console.error("No user is logged in");
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
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search friends..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => addFriend()} className="add-friend-button">
              Add Friend
            </button>
          </div>
          <div className="friends-page-container">
            <h3>Your Friends</h3>
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