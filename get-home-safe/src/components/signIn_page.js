import React from 'react';
import SignInForm from './signIn_form';
import ForgotPasswordLink from './forgot_password_link';
import UWNetIDHelp from './UWNetIDHelp';
import UWImage from '../IMG/uwlogo.png';


const SignInPage = () => {
  return (
    <div className="sign-in-page">
      <img src={UWImage} alt="UW Logo" className="uw-logo"/>
      <h1 className="app-name">UW GET HOME SAFE</h1>
      <SignInForm />
      <ForgotPasswordLink />
      <UWNetIDHelp />
    </div>
  );
};

export default SignInPage;