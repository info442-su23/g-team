import React from 'react';
import SignUpForm from './sign_up_form';
import UWNetIDHelp from './UWNetIDHelp';

const SignUpPage = () => {
  return (
    <div className="sign-up-page">
      <SignUpForm />
      <UWNetIDHelp />
    </div>
  );
};

export default SignUpPage;
