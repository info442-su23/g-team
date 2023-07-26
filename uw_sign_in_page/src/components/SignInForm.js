// src/components/SignInForm.js
import React, { useState } from 'react';

const SignInForm = () => {
  const [uwNetID, setUwNetID] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to backend).
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="uwNetID">UW NetID:</label>
        <input
          type="text"
          id="uwNetID"
          value={uwNetID}
          onChange={(e) => setUwNetID(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
