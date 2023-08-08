import React from 'react';
import SignUpForm from './sign_up_form';
import UWNetIDHelp from './UWNetIDHelp';
import UWImage from '../IMG/uwlogo.png';

const SignUpPage = () => {
  return (
    <div className="sign-up-page">
      <img src={UWImage} alt="UW Logo" className="uw-logo"/>
      <h1 className="app-name">UW GET HOME SAFE</h1>
      <SignUpForm />
      <UWNetIDHelp />
    </div>
  );
};

export default SignUpPage;
