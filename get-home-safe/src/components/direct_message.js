import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc // Import addDoc instead of collection as default import
} from 'firebase/firestore'; // Make sure to import the correct Firestore functions
import { db } from '../index';
import { Footer } from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import UserContext from './user_context';
import Navbar from './navbar';
import FriendsList from './friends_list';

const DirectMessage = () => {
  const { userId: currentUserId } = useContext(UserContext);
  const { friendId } = useParams();
  const navigate = useNavigate();

  const [selectedFriend, setSelectedFriend] = useState(friendId);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [failedMessages, setFailedMessages] = useState([]);
  const [opponentData, setOpponentData] = useState({});

  function generateConversationId(userId1, userId2) {
    return [userId1, userId2].sort().join('-');
  }

  const handleFriendClick = (friendId) => {
    navigate(`/direct-message/${friendId}`);
  };

  useEffect(() => {
    setSelectedFriend(friendId);

    const fetchFriends = async () => {
      try {
        const conversationsRef = collection(db, 'conversations');
        const querySnapshot = await getDocs(
          query(conversationsRef, where('participants', 'array-contains', currentUserId))
        );

        const friendData = [];
        for (const docSnapshot of querySnapshot.docs) {
          const conversationData = docSnapshot.data();
          const friendId = conversationData.participants.find((id) => id !== currentUserId);
          const friendDoc = await getDoc(doc(db, 'users', friendId));
          if (friendDoc.exists()) {
            const friend = {
              id: friendId,
              username: friendDoc.data().username,
              profileImageURL: friendDoc.data().profileImageURL,
            };
            friendData.push(friend);
          }
        }

        setFriends(friendData);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };
    fetchFriends();
  }, [currentUserId, friendId]);

  const conversationId = generateConversationId(currentUserId, selectedFriend);
  console.log('Conversation ID:', conversationId);

  useEffect(() => {
    if (conversationId) {
      const unsubscribe = onSnapshot(
        query(collection(db, 'conversations', conversationId, 'messages'), orderBy('timestamp', 'asc')),
        (snapshot) => {
          setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
      );

      return () => unsubscribe();
    }
  }, [conversationId, selectedFriend]);

  useEffect(() => {
    const fetchOpponentData = async () => {
      if (selectedFriend) {
        const userDoc = await getDoc(doc(db, 'users', selectedFriend));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setOpponentData(userData);
        }
      }
    };
    fetchOpponentData();
  }, [selectedFriend]);

  const sendMessage = async () => {
    try {
      const messageData = {
        text: newMessage,
        author: currentUserId,
        timestamp: new Date().getTime(),
      };

      const conversationRef = doc(db, 'conversations', conversationId);

      // Check if the conversation exists, if not, create one
      const conversationSnapshot = await getDoc(conversationRef);
      if (!conversationSnapshot.exists()) {
        await setDoc(conversationRef, {
          participants: [currentUserId, selectedFriend],
        });
      }

      // Use addDoc instead of collection for adding the message
      await addDoc(collection(db, 'conversations', conversationId, 'messages'), messageData);

      setNewMessage(''); // Clear the message input

    } catch (error) {
      console.error('Failed to send message:', error);
      setFailedMessages([...failedMessages, newMessage]);
    }
  };


  return (
    <>
      <header>
        <Navbar />
      </header>

      <body>
      <div className="direct-message-page">
        {/* FriendsList on the left */}
        <FriendsList />

        {/* Right container */}
        <div className="right-container">
          {/* Top friend-list within the right container */}
          <div className="friend-list">
            <h2>Messages</h2>
            {friends.map((friend) => (
              <div
                key={friend.id}
                className={`friend ${selectedFriend === friend.id ? 'selected' : ''}`}
                onClick={() => handleFriendClick(friend.id)}
              >
                <img
                  src={friend.profileImageURL || '/path_to_default_image.jpg'}
                  alt={`${friend.username || 'Unknown'} Profile Image`}
                  className="friend-profile-image"
                />
                <span>{friend.username || 'Unknown'}</span>
              </div>
            ))}
          </div>

          {/* Chat container below friend-list within the right container */}
          <div className="chat-container">
            {selectedFriend && (
              <>
                {/* Opponent's username and profile picture */}
                <div className="opponent-header">
                  <img
                    src={opponentData.profileImageURL || '/path_to_default_image.jpg'}
                    alt={`${opponentData.username || 'Unknown'} Profile Image`}
                    className="opponent-profile-image"
                  />
                  <span>{opponentData.username || 'Unknown'}</span>
                </div>

                <div className="message-box">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message-dm ${message.author === currentUserId ? 'sent' : 'received'}`}
                    >
                      {message.text}
                      {failedMessages.includes(message.text) && (
                        <FontAwesomeIcon icon={faExclamationCircle} color="red" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="message-send">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                  />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      </body>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default DirectMessage;

