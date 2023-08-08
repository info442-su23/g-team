import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../index';
import { Link } from 'react-router-dom';


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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set the display name for the user
      await updateProfile(auth.currentUser, {
        displayName: email.split('@')[0], // Set the username as the part of the email before the '@' symbol
      });

      // Create a document for the new user in the 'users' collection.
      const userDocRef = doc(collection(db, 'users'), userCredential.user.uid);
      await setDoc(userDocRef, {
        email: email,                             // Save the email
        username: email.split('@')[0],            // Save the username as the part of the email before the '@' symbol
        friends: [],
        profileImageURL: "https://firebasestorage.googleapis.com/v0/b/info442-71420.appspot.com/o/profile_images%2Fdefault%20profile.webp?alt=media&token=33efd42e-ac49-4e02-b755-cc1492d47e7f"
      });

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



