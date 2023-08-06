import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { onSnapshot, collection, addDoc, serverTimestamp, query, orderBy, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../index';
import { Footer } from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import UserContext from './user_context';
import Navbar from './navbar';

const DirectMessage = () => {
  const { userId: currentUserId } = useContext(UserContext);
  const { friendId } = useParams();

  const [selectedFriend, setSelectedFriend] = useState(friendId);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [failedMessages, setFailedMessages] = useState([]);

  function generateConversationId(userId1, userId2) {
    return [userId1, userId2].sort().join('-');
  }

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

  const conversationId = generateConversationId(currentUserId, selectedFriend);

  useEffect(() => {
    if (conversationId) {
      const unsubscribe = onSnapshot(query(collection(db, 'conversations', conversationId, 'messages'), orderBy('timestamp', 'asc')), snapshot => {
        setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });

      return () => unsubscribe();
    }
  }, [conversationId, selectedFriend]);

  const sendMessage = async () => {
    try {
      const messageData = {
        text: newMessage,
        author: currentUserId,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, 'conversations', conversationId, 'messages'), messageData);
      await setDoc(doc(db, 'conversations', conversationId), {
        participants: [currentUserId, selectedFriend]
      }, { merge: true });
      setNewMessage('');

    } catch (error) {
      console.error("Failed to send message:", error);
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
                setSelectedFriend(friend.id);
              }}
            >
              {friend.username}
            </div>
          ))}
        </div>

        <div className="right-container">
          {selectedFriend && (
            <div className="chat-container">
              <div className="message-box">
                {messages.map((message, index) =>
                  <div
                    key={index}
                    className={`message-dm ${message.author === currentUserId ? "sent" : "received"}`}>
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
          )}
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default DirectMessage;

