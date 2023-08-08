import React, { useContext } from 'react';
import '../../src/style.css';
import Navbar from './navbar';
import { Footer } from './footer';
import { Link } from 'react-router-dom';
import UserContext from './user_context';  // Import the UserContext

const Settings = () => {
  const { username, profileImageURL } = useContext(UserContext);  // Use context to get current user's info

  return (
    <>
      <Navbar />
      <body>
        <div className="setting-container">
            <h1>User Settings</h1>
                <div className="profile-container">
                    <img id="current-profile-picture" src={profileImageURL} alt="Profile Picture" />  {/* Use profileImageURL */}
                    <h1>@{username}</h1>

                    <div className="notification-setting">
                        <label htmlFor="notifications">Enable Notification</label>
                        <input type="checkbox" id="notifications" />
                    </div>

                    <div className="edit-profile">
                        <Link to="/edit-settings"><button className='editProfileBtn'>Edit Profile</button></Link>
                    </div>

                    <div className='logout'>
                      <Link to="/signin-page">
                        <input type="submit" value="Log-Out" className="logoutBtn" />
                      </Link>
                    </div>
                </div>
            </div>
        </body>
        <Footer />
    </>
  );
};

export default Settings;

