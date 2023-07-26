import React, { useState } from 'react';
import BuddyRequests from './buddy_request';
import Navbar from './navbar';

function GetHomeSafeFeature() {
  // State to check location input
  const [location, setLocation] = useState('');
  // State to check if the location field is empty or not
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  // Event handler for form submission
  // If the location textbox is empty, set isFormInvalid to true
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === '') {
      setIsFormInvalid(true);
    } else {
      setIsFormInvalid(false);
    }
  };

  return (
    <>
      <Navbar />
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
                  <select id="people-count">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                  <button type="submit" className='requestBtn'>Request</button>
                </form>
                {/*If isFormInvalid state is ture, then the following error message will be displayed */}
                {isFormInvalid && <p id="fill-in-message"> Please fill in all the required fields!</p>}
              </div>
            </div>
            <BuddyRequests />
          </div>
      </div>
    </>
  );
}

export default GetHomeSafeFeature;


