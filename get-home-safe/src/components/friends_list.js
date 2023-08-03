import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import profileImage from '../IMG/empty profile.jpeg';

const FriendsList = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUsername(user.email.split('@')[0]); // split email string by '@' and take the first part
    }
  }, []);

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
      <div className="friend-box">
        <div className="friend">@Friend 1</div>
      </div>
      <div className="friend-box">
        <div className="friend">@Friend 2</div>
      </div>
      <div className="friend-box">
        <div className="friend">@Friend 3</div>
      </div>
    </div>
  );
};

export default FriendsList;



