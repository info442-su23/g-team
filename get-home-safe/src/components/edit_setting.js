import React, { useState } from 'react';
import profileImage from '../IMG/empty profile.jpeg';
import Navbar from './navbar';
import Popup from './popup';


const EditSettings = () => {
  // State to control the popup
  const [isOpen, setIsOpen] = useState(false);
  // Event handler for the edit setting form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  // Event handler for closing the popup
  const closePopup = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      <Navbar />
        <h1>Edit Profile</h1>

        <div className="profile">
          <form id="user-settings" onSubmit={handleSubmit}>
            <img id="current-profile-picture" src={profileImage} alt="Profile Picture" />
            <label htmlFor="change-profile-img">Change Profile Image</label>
            <input type="file" id="change-profile-img" name="change-profile-img" />
            <br /><br />

            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <br /><br />

            <label htmlFor="major">Major:</label>
            <input type="text" id="major" name="major" />
            <br /><br />

            <label htmlFor="school-year">School Year:</label>
            <select id="year" name="year">
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </select>
            <br /><br />
            <input type="submit" value="Save Changes" className="saveChangeBtn" />
          </form>
        </div>
        <Popup isOpen={isOpen} handleClose={closePopup} />
    </>
  );
};

export default EditSettings;


