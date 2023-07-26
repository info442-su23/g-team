// src/components/SignInPage.js
import React from 'react';
import Logo from './Logo'; // Correct the import path here
import SignInForm from './SignInForm';
import ForgotPasswordLink from './ForgotPasswordLink';
import UWNetIDHelp from './UWNetIDHelp';
import '../styles/SignInPage.css';

const SignInPage = () => {
  return (
    <div className="sign-in-page">
      <Logo />
      <SignInForm />
      <ForgotPasswordLink />
      <UWNetIDHelp />
    </div>
  );
};

export default SignInPage;
