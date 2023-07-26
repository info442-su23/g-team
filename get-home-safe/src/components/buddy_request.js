import React from 'react';
import profileImage from '../IMG/empty profile.jpeg';


function BuddyRequests() {
  return (
      <div className="buddy-request-container">
        <h2>Buddy Requests</h2>
        <div className="buddy-request-box">
          <div className="profile-pic-container">
            <img src={profileImage} alt="Profile Picture" className="profile-pic"/>
          </div>
          <div className="buddy-request">@User1 Request
            <div className="location">Location</div>
          </div>
        </div>

        <div className="buddy-request-box">
          <div className="profile-pic-container">
            <img src={profileImage} alt="Profile Picture" className="profile-pic"/>
          </div>
          <div className="buddy-request">@User2 Request
            <div className="location">Location</div>
          </div>
        </div>

        <div className="buddy-request-box">
          <div className="profile-pic-container">
            <img src={profileImage} alt="Profile Picture" className="profile-pic"/>
          </div>
          <div className="buddy-request">@User3 Request
            <div className="location">Location</div>
          </div>
        </div>

        <div className="buddy-request-box">
          <div className="profile-pic-container">
            <img src={profileImage} alt="Profile Picture" className="profile-pic"/>
          </div>
          <div className="buddy-request">@User4 Request
            <div className="location">Location</div>
          </div>
        </div>

        <div className="buddy-request-box">
          <div className="profile-pic-container">
            <img src={profileImage} alt="Profile Picture" className="profile-pic"/>
          </div>
          <div className="buddy-request">@User5 Request
            <div className="location">Location</div>
          </div>
        </div>

      </div>
  );
}

export default BuddyRequests;
