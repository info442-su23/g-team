import React, { useContext, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../index';
import Navbar from './navbar';
import { Footer } from './footer';
import Popup from './popup';
import UserContext from './user_context';

const EditSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userId, profileImageURL, setProfileImageURL } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image if selected
    if (userId && selectedImage) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `profile_images/${userId}`);
        await uploadBytes(storageRef, selectedImage);

        const downloadURL = await getDownloadURL(storageRef);

        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
          profileImageURL: downloadURL,
        });

        setProfileImageURL(downloadURL);
      } catch (error) {
        console.error("Error updating profile image: ", error);
      }
    }

    // Save other profile details (gender, major, school year)
    // NOTE: You'll need to implement this part

    setIsOpen(true);  // Show success message after saving details
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const closePopup = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };



  return (
    <>
      <header>
        <Navbar />
      </header>

      <h1>Edit Profile</h1>
      <div className="profile">
        <form id="user-settings" onSubmit={handleSubmit}>
          <img
            id="current-profile-picture"
            src={profileImageURL}
            alt="Profile Picture"
          />
          <label htmlFor="change-profile-img">Change Profile Image</label>
          <input
            type="file"
            id="change-profile-img"
            name="change-profile-img"
            onChange={handleImageChange}
          />
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

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default EditSettings;


