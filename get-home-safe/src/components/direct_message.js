import React, { useState } from 'react';
import FriendsList from './friends_list';
import Navbar from './navbar';
import { Footer } from './footer';

const DirectMessage = () => {
    const user = "User";
    const [friends, setFriends] = useState(['Friend1', 'Friend2', 'Friend3']);
    const [activeFriend, setActiveFriend] = useState('Friend1');
    const [messages, setMessages] = useState({
        'Friend1': [{ text: 'Did you see that guy near MaryGates?', author: 'Friend1' }, { text: 'Becareful when u are passing by!', author: 'Friend1' }],
        'Friend2': [{ text: 'Hey, do you need a walking buddy?', author: 'Friend2' }, { text: 'I am near your location right now!', author: 'Friend2' }],
        'Friend3': [{ text: 'Good morning!', author: 'Friend3' }, { text: 'Have a safe day!', author: 'Friend3' }]
    });
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        const newMessages = { ...messages };
        if (newMessages[activeFriend]) {
            newMessages[activeFriend].push({ text: newMessage, author: user });
        } else {
            newMessages[activeFriend] = [{ text: newMessage, author: user }];
        }
        setMessages(newMessages);
        setNewMessage('');
    }

    return (
      <>
      <header>
        <Navbar />
      </header>
      <body>
        <div className="direct-message-page">
          <FriendsList />
          <div className="right-container">
            <div className="conversation-list">
              <h2>Messages</h2>
              {friends.map((friend) =>
                <div key={friend} onClick={() => setActiveFriend(friend)} className="conversation-box">
                  {friend}
                </div>
              )}
            </div>
            {activeFriend &&
              <div className="chat-container">
                <div className="message-box">
                  {messages[activeFriend] && messages[activeFriend].map((message, index) =>
                    <div key={index} className={`message-dm ${message.author === user ? "right" : "left"}`}>
                      {message.text}
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
      </body>

      <footer>
        <Footer />
      </footer>
    </>
    );
};

export default DirectMessage;

