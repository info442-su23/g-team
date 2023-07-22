import React from 'react';
import './App.css';
import Header from './components/Header';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <div className="friends-list-container">
          <h2>Friends List</h2>
          <div className="search-bar-container">
            <input type="text" placeholder="Search friends..." className="search-bar" />
          </div>
          <FriendsList />
        </div>
        <div className="actions-container">
          <h2>Actions</h2>
          <button className="action-button">Suggestions</button>
          <button className="action-button">Add Friend</button>
          <button className="action-button">Block</button>
        </div>
      </div>
    </div>
  );
}

export default App;
