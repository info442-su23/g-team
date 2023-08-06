import React, { useEffect, useState, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import profileImage from '../IMG/empty profile.jpeg';
import UserContext from './user_context';

const FriendsList = () => {
  const { userId } = useContext(UserContext);  // Destructure userId from the context
  const [username, setUsername] = useState('');
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUsername(user.email.split('@')[0]); // split email string by '@' and take the first part
    }

    // Fetching online friends
    const db = getDatabase();
    const statusRef = ref(db, 'status');
    const handleValueChange = snapshot => {
      const statuses = snapshot.val();
      const onlineUsers = [];
      for (let uid in statuses) {
        if (statuses[uid].state === 'online' && uid !== userId) { // Check if the user is not the current user
          onlineUsers.push(statuses[uid]);
        }
      }
      setOnlineFriends(onlineUsers);
    };

    onValue(statusRef, handleValueChange);

    // Cleanup listener on component unmount
    return () => {
      off(statusRef, 'value', handleValueChange);
    }

  }, [userId]);



  return (
    <div className="friends-list">
      <div className="my-info-box">
        <div className="profile-info">
          <div className="profile-img">
            <img src={profileImage} alt="Profile Image" />
          </div>
          <div className="my-info-content">
            {username ? `@${username}` : '@My Username'}
          </div>
        </div>
      </div>

      <h2>Friends Online</h2>
      {onlineFriends.map((friend, index) => (
        <div key={index} className="friend-box">
          <div className="friend">@{friend.username || 'Unknown'}
          <div className="online-indicator"></div> {/* This is the new circle icon */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;




