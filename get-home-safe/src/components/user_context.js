import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, set } from "firebase/database";
import { realtimeDB } from '../index';

const UserContext = React.createContext({
  username: null,
  setUsername: () => {},
  userId: null,
  setUserId: () => {},
});

export const UserProvider = (props) => {
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const isOnlineForDatabase = {
          state: 'online',
          last_changed: new Date().toISOString(),
          username: user.displayName || "User"
        };
        const uid = user.uid;
        setUserId(uid);
        setUsername(user.displayName || "User");
        const userStatusDatabaseRef = ref(realtimeDB, '/status/' + uid);
        set(userStatusDatabaseRef, isOnlineForDatabase);
      } else {
        const isOfflineForDatabase = {
          state: 'offline',
          last_changed: new Date().toISOString()
        };
        if (userId) {
          const userStatusDatabaseRef = ref(realtimeDB, '/status/' + userId);
          set(userStatusDatabaseRef, isOfflineForDatabase);
        }
        setUserId(null);
        setUsername(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
}, [userId]);

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
