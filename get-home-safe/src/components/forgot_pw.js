import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import UWImage from '../IMG/uwlogo.png';



function ForgotPwPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform email validation
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent successfully!');
      setError('');
    } catch (error) {
      setError('Error sending password reset email. Please try again later.');
      setSuccessMessage('');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="forgotPwPage">
      <img src={UWImage} alt="UW Logo" className="uw-logo"/>
      <h1 className="app-name">UW GET HOME SAFE</h1>
      <div className="forgotPwFormContainer">
        <h2>Find Password</h2>
        <p>
            Enter your email address and we'll send you a link to reset your password.
        </p>
        <form className="find-pw" onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
              aria-label="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="findpwInput"
            />
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button className="forgotPwBtn" type="submit" role="button" aria-label="Click here to request reset password email">
              Submit
            </button>
        </form>
      </div>
    </div>
  );
}

export { ForgotPwPage };
