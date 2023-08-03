import React from 'react';
import SignInForm from './signIn_form';
import ForgotPasswordLink from './forgot_password_link';
import UWNetIDHelp from './UWNetIDHelp';

const SignInPage = () => {
  return (
    <div className="sign-in-page">
      <SignInForm />
      <ForgotPasswordLink />
      <UWNetIDHelp />
    </div>
  );
};

export default SignInPage;