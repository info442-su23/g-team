// Import necessary modules and functions
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

// Define state variables for the sign-in form
const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error message before new attempt
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // If sser signs in successfully, redirect them to the home page.
      navigate("/");
    } catch (error) {
      // Handle errors here, display the error message to the user
      setError("Incorrect email or password.");
    }
  };

  // Render layout
  return (
    <div>
      <form className="signInForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="signInInput"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className='signInInput'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className= "signInBtn" type="submit">Sign In</button>
        {error && <p>{error}</p>}
        <p>Don't have an account? <Link to="/signup-page">Sign Up</Link></p>
        <Link to="/forgot-password" className="forgotPasswordLink">Forgot your password?</Link>
      </form>
    </div>
  );
};

export default SignInForm;




