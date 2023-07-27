import React, { useState } from 'react';
import Navbar from './navbar';
import { Footer } from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function FriendsListPage() {
  const [friends, setFriends] = useState([
    { id: 1, name: 'Friend 1', isBlocked: false },
    { id: 2, name: 'Friend 2', isBlocked: false },
    { id: 3, name: 'Friend 3', isBlocked: false },
    { id: 4, name: 'Friend 4', isBlocked: false },
    { id: 5, name: 'Friend 5', isBlocked: false },
  ]);

  const [suggestedFriends, setSuggestedFriends] = useState([
    { id: 6, name: 'Suggested Friend 1', isBlocked: false },
    { id: 7, name: 'Suggested Friend 2', isBlocked: false },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriend = () => {
    if (searchQuery.trim() !== '') {
      const newFriend = { id: friends.length + 1, name: searchQuery.trim(), isBlocked: false };
      setFriends((prevFriends) => [...prevFriends, newFriend]);
      setSearchQuery('');
    }
  };

  const handleBlockFriend = (friendId) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === friendId ? { ...friend, isBlocked: true } : friend
      )
    );
  };

  const handleUnblockFriend = (friendId) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === friendId ? { ...friend, isBlocked: false } : friend
      )
    );
  };

  const handleUnfriend = (friendId) => {
    setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId));
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  const handleSendMessage = (message) => {
    alert(`Message to ${selectedFriend.name}: ${message}`);
  };

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
            <button onClick={handleAddFriend} className="add-friend-button">
              Add Friend
            </button>
          </div>
          <div className="friends-page-container">
          <h3>Your Friends</h3>
          {friends.map((friend) => (
            <div key={friend.id} className={`friend ${friend.isBlocked ? 'blocked' : ''}`}>
              <span>{friend.name}</span>
              <div className="friend-actions">
                <Link to= "/direct-message">
                  <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '5px' }} />
                </Link>
                {!friend.isBlocked ? (
                  <button className="block-button" onClick={() => handleBlockFriend(friend.id)}>
                    Block
                  </button>
                ) : (
                  <button className="unblock-button" onClick={() => handleUnblockFriend(friend.id)}>
                    Unblock
                  </button>
                )}
                <button className="unfriend-button" onClick={() => handleUnfriend(friend.id)}>
                  Unfriend
                </button>
              </div>
            </div>
          ))}

          </div>
          <div className="suggested-friends-page-container">
          <h3>Suggested Friends</h3>
          {suggestedFriends.map((suggestedFriend) => (
            <div key={suggestedFriend.id} className={`suggested-friend ${suggestedFriend.isBlocked ? 'blocked' : ''}`}>
              <span>{suggestedFriend.name}</span>
              <div className="friend-actions">
                {!suggestedFriend.isBlocked ? (
                  <button className="block-button" onClick={() => handleBlockFriend(suggestedFriend.id)}>
                    Block
                  </button>
                ) : (
                  <button className="unblock-button" onClick={() => handleUnblockFriend(suggestedFriend.id)}>
                    Unblock
                  </button>
                )}
                <button className="unfriend-button" onClick={() => handleUnfriend(suggestedFriend.id)}>
                  Unfriend
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

