import React from 'react';
import '../../src/style.css';
import profileImage from '../IMG/empty profile.jpeg';
import Navbar from './navbar';
import { Footer } from './footer';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <>
      <Navbar />
      <body>
        <div className="setting-container">
            <h1>User Settings</h1>
                <div className="profile-container">
                    <img id="current-profile-picture" src={profileImage} alt="Profile Picture" />
                    <h1>@Username</h1>

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
