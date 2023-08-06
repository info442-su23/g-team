import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { onSnapshot, collection, addDoc, serverTimestamp, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '../index';
import { Footer } from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import UserContext from './user_context';
import Navbar from './navbar';

const DirectMessage = () => {
  // Get the current user ID from the UserContext
  const { userId: currentUserId } = useContext(UserContext);
  // Get the friend ID from the URL parameters
  const { friendId } = useParams();
  // State variables to store data
  const [friendIdState, setFriendIdState] = useState(friendId); // Added this state
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [failedMessages, setFailedMessages] = useState([]);

  // Fetch the friends list for the current user from Firestore
  useEffect(() => {
    const fetchFriends = async () => {
      const userDoc = await getDoc(doc(db, 'users', currentUserId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFriends(userData.friends || []);
      }
    };
    fetchFriends();
  }, [currentUserId]);

  // Fetch messages for the selected friend from Firestore
  useEffect(() => {
    if (friendIdState) {
      // Set up an event listener to track changes in messages for the selected friend
      const unsubscribe = onSnapshot(query(collection(db, 'messages', friendIdState, 'userMessages'), orderBy('timestamp', 'asc')), snapshot => {
        // Update the messages state with the new data from Firestore
        setMessages(snapshot.docs.map(doc => doc.data()));
      });

      return () => unsubscribe();
    }
  }, [friendIdState]);

  // Function to send new message to friend
  const sendMessage = async () => {
    try {
      // Add the new message to the Firestore "message" collection
      await addDoc(collection(db, 'messages', friendIdState, 'userMessages'), {
        text: newMessage,
        author: currentUserId,
        timestamp: serverTimestamp(),
      });
       // Clear the newMessage state after sending the message
      setNewMessage('');
    } catch (error) {
      setFailedMessages([...failedMessages, newMessage]);
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <div className="direct-message-page">
        <div className="friend-list">
          {friends.map(friend => (
            <div
              key={friend.id}
              onClick={() => {
                setFriendIdState(friend.id);
                setMessages([]);
              }}
            >
              {friend.username}
            </div>
          ))}
        </div>

        <div className="right-container">
          {friendIdState &&
            <div className="chat-container">
              <div className="message-box">
                {messages.map((message, index) =>
                  <div key={index} className={`message-dm ${message.author === currentUserId ? "right" : "left"}`}>
                    {message.text}
                    {failedMessages.includes(message.text) && <FontAwesomeIcon icon={faExclamationCircle} color="red" />}
                  </div>
                )}
              </div>
              <div className="message-send">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          }
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default DirectMessage;