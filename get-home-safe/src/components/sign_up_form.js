// Import necesssary modules and functions
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

// State variables for sign-up form
const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if either email or password is empty, if set error message.
    if (email === '' || password === '') {
      setError("Please fill out all required fields!");
      return;
    }

    setError(""); // reset error message before new attempt
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User registered successfully.
      // Set signUpSuccess to true
      setSignUpSuccess(true);
    } catch (error) {
      // Handle errors, display the error message to the user
      setError(error.message);
    }
  };

  return (
    <div>
      <form className="signUpForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="signUpInput"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className='signUpInput'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        {signUpSuccess && <p>You signed up successfully! You can now <Link to="/signin-page">sign in</Link>.</p>}
        <button className= "signUpBtn" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;


