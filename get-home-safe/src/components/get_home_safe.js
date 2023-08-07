import React, { useState, useContext } from 'react';
import BuddyRequests from './buddy_request';
import { Footer } from './footer';
import Navbar from './navbar';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import UserContext from './user_context';

function GetHomeSafeFeature() {
  // State to check location input
  const [location, setLocation] = useState('');
  // State to check the number of people
  const [peopleCount, setPeopleCount] = useState('1');
  // State to check if the location field is empty or not
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const firestore = getFirestore();

  const { username } = useContext(UserContext);

  // Event handler for form submission
  // If the location textbox is empty, set isFormInvalid to true
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location === '') {
      setIsFormInvalid(true);
    } else {
      setIsFormInvalid(false);
      // Storing the request in Firestore
      const requestsCollection = collection(firestore, "buddyRequests");
      await addDoc(requestsCollection, {
        username: username || '@Unknown',
        location: location,
        peopleCount: peopleCount
      });
      setLocation('');  // reset the location input
      setPeopleCount('1'); // reset the people count
    }
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
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default GetHomeSafeFeature;




