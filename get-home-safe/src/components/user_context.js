import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../index';
import profileImage from '../IMG/empty profile.jpeg';

const UserContext = createContext({
  username: null,
  setUsername: () => {},
  userId: null,
  setUserId: () => {},
  profileImageURL: profileImage,
  setProfileImageURL: () => {},
});

export const UserProvider = (props) => {
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(profileImage);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        setUsername(user.displayName || "User");

        const userDocRef = doc(db, 'users', uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          if (userData.profileImageURL) {
            setProfileImageURL(userData.profileImageURL);
          }
        }
      } else {
        setUserId(null);
        setUsername(null);
        setProfileImageURL(profileImage); // Reset to default
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId, profileImageURL, setProfileImageURL }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;



