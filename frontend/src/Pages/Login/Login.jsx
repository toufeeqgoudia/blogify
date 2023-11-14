import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Login = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <>
      {currentForm === 'login' ? (
        <SignIn onFormSwitch={toggleForm} />
      ) : (
        <SignUp onFormSwitch={toggleForm} />
      )}
    </>
  );
}

export default Login