import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// UserContext objecct with createContext in React
const UserContext = React.createContext({
  username: null,
  setUsername: () => {},
  userId: null,
  setUserId: () => {},
});

export const UserProvider = (props) => {
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);

  // Get  user authenticiation from firebase
  useEffect(() => {
    const auth = getAuth();

    //Set up an event listener to track changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User Data: ", user);
        const uid = user.uid;
        setUserId(uid);
        setUsername(user.displayName || "User");
        console.log("User ID: ", uid);
      } else {
        setUserId(null);
        setUsername(null);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Render the UserContext.Provider with the current username, setUsername, userId, and setUserId as the context value
  // The wrapped child components are rendered using props.children
  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;


