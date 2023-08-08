import React, { useEffect, useState, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import profileImage from '../IMG/empty profile.jpeg';
import UserContext from './user_context';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../index';

const FriendsList = () => {
  const { userId: currentUserId, profileImageURL: currentProfileImageURL } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [onlineFriends, setOnlineFriends] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUsername(user.email.split('@')[0]); // Split email string by '@' and take the first part
    }

    // Fetching online friends
    const statusRef = ref(getDatabase(), 'status');

    const handleValueChange = async (snapshot) => {
      const statuses = snapshot.val();
      console.log('All Statuses:', statuses);

      const onlineUsers = [];

      // Fetch all user documents from Firestore
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);

      usersSnapshot.docs.forEach((userDoc) => {
        const userData = userDoc.data();
        const userId = userDoc.id;

        // Check if the user is online and not the current user
        if (statuses[userId] && statuses[userId].state === 'online' && userId !== currentUserId) {
          onlineUsers.push({ ...userData, userId }); // Include userId in the user data
        }
      });

      console.log('Online Users:', onlineUsers);
      setOnlineFriends(onlineUsers);
    };

    onValue(statusRef, handleValueChange);

    // Cleanup listener on component unmount
    return () => {
      off(statusRef, 'value', handleValueChange);
    };
  }, [currentUserId]);

  const handleFriendClick = (friendUserId) => {
    navigate(`/direct-message/${friendUserId}`);
  };

  return (
    <div className="friends-list">
      <div className="my-info-box">
        <div className="profile-info">
          <div className="profile-img">
            <img src={currentProfileImageURL || profileImage} alt="My Profile Image" />
          </div>
          <div className="my-info-content">
            {username ? `@${username}` : '@My Username'}
          </div>
        </div>
      </div>

      <h2>Friends Online</h2>
      {onlineFriends.map((friend) => (
        <div
          key={friend.userId}
          className="friend-box"
          onClick={() => handleFriendClick(friend.userId)}
        >
          <div className="friend">
            <img
              src={friend.profileImageURL || profileImage}
              alt={`${friend.username || 'Unknown'} Profile Image`}
              className="friend-profile-image"
            />
            {friend.username || 'Unknown'}
            <div className="online-indicator"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
