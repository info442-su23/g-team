import React from 'react';

const BuddyPopup = ({ isOpen, handleClose }) => (
  <div id="popup1" className={`overlay ${isOpen ? 'active' : ''}`}>
      <div className="popup">
          <a className="close" href="#" onClick={handleClose}>&times;</a>
          <div className="success-message">
              <div className="checkmark">&#x2713;</div>
              Your request have been requested successfully!
          </div>
      </div>
  </div>
);

export default BuddyPopup;