import React, { useState, useContext } from 'react';
import BuddyRequests from './buddy_request';
import { Footer } from './footer';
import Navbar from './navbar';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import UserContext from './user_context';
import BuddyPopup from './walking_buddy_popup';
import { useNavigate } from 'react-router-dom';

function GetHomeSafeFeature() {
  const [location, setLocation] = useState('');
  const [peopleCount, setPeopleCount] = useState('1');
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [showPopup, setShowPopup] = useState(false);  // State to control the popup visibility
  const firestore = getFirestore();
  const { username } = useContext(UserContext);
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location === '') {
      setIsFormInvalid(true);
    } else {
      setIsFormInvalid(false);
      const requestsCollection = collection(firestore, "buddyRequests");
      await addDoc(requestsCollection, {
        username: username || '@Unknown',
        location: location,
        peopleCount: peopleCount
      });
      setLocation('');
      setPeopleCount('1');
      setShowPopup(true); // Show the popup when the form is submitted successfully
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);  // Close the popup
    window.location.reload(); // Trigger a full page reload
};


  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className='getHomeSafeFeature'>
        <h1>Get Home Safe Feature</h1>
        <p>Need a buddy to walk you home?</p>
        <div className="container">
          <div className="request-form">
            <h2>Request a Walking Buddy</h2>
            <div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="location">Location for Walking Buddy?</label>
                <input type="text" id="location" placeholder="Enter location" value={location} onChange={e => setLocation(e.target.value)} />
                <label htmlFor="peopleCount">How many people?</label>
                <select id="people-count" value={peopleCount} onChange={e => setPeopleCount(e.target.value)}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5+</option>
                </select>
                <button type="submit" className='requestBtn'>Request</button>
              </form>
              {isFormInvalid && <p id="fill-in-message"> Please fill in all the required fields!</p>}
            </div>
          </div>
          <BuddyRequests />
        </div>
        <BuddyPopup isOpen={showPopup} handleClose={handlePopupClose} /> {/* Add the Popup component */}
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default GetHomeSafeFeature;






