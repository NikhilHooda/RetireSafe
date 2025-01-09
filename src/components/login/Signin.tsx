import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from './Welcome';
import '../../styles/signin.scss';

const Signin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Invalid email address';
  };

  const validatePassword = (password: string) => {
    return password.trim() !== '' ? '' : 'Password is required';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(value),
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value),
    }));
  };

  const handleSignin = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
    } else {
      // Handle signin logic here
      navigate('/setup');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleSendRecoveryEmail = () => {
    const emailError = validateEmail(email);

    if (emailError) {
      setErrors({
        email: emailError,
      });
    } else {
      // Handle send recovery email logic here
      alert('If the email is registered, a recovery email will be sent with password recovery details.');
      setIsForgotPassword(false);
    }
  };

  return (
    <div className="signin">
      <Welcome />
      <div className="signin__form">
        {isForgotPassword ? (
          <>
            <p>If the email is registered, a recovery email will be sent with password recovery details.</p>
            <label htmlFor="email" className="signin__label">Email</label>
            <input
              type="email"
              id="email"
              className={`signin__input ${errors.email ? 'error-border' : ''}`}
              value={email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
            <button className="signin__button signin__button--primary" onClick={handleSendRecoveryEmail}>Send Recovery Email</button>
            <button className="signin__button signin__button--secondary" onClick={() => setIsForgotPassword(false)}>Cancel</button>
          </>
        ) : (
          <>
            <label htmlFor="email" className="signin__label">Email</label>
            <input
              type="email"
              id="email"
              className={`signin__input ${errors.email ? 'error-border' : ''}`}
              value={email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
            <label htmlFor="password" className="signin__label">Password</label>
            <input
              type="password"
              id="password"
              className={`signin__input ${errors.password ? 'error-border' : ''}`}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
            <button className="signin__button signin__button--primary" onClick={handleSignin}>Sign In</button>
            <button className="signin__button signin__button--secondary" onClick={handleCancel}>Cancel</button>
            <button className="signin__button signin__button--link" onClick={handleForgotPassword}>Forgot password?</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Signin;
