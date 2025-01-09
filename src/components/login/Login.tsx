import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../../utils/icons';
import '../../styles/login.scss';
import Welcome from './Welcome';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSkipSignUp = () => {
    navigate('/setup');
  };

  return (
    <div className="login">
      <Welcome />
      <div className="login__signin">
        <p className="login__signin-text">Already have an account?</p>
        <button className="login__signin-button" onClick={handleSignIn}>Sign in</button>
      </div>
      <div className="login__signup">
        <p className="login__signup-text">New to Retirement Planning App</p>
        <button className="login__signup-button" onClick={handleSignUp}>Create Account</button>
      </div>
      <button className="login__skip" onClick={handleSkipSignUp}>
        <span className="login__skip-text">Skip sign up for now</span>
        <span className="login__skip-icon">
            <i className="fas fa-arrow-right"></i>
        </span>
      </button>
    </div>
  );
};

export default Login;
