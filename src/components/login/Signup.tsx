import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from './Welcome';
import '../../styles/signup.scss';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isConfirmPasswordDirty, setIsConfirmPasswordDirty] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Invalid email address';
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
      ? ''
      : 'Password must be at least 8 characters long and include at least one uppercase letter, one special character, and one number';
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword ? '' : 'Passwords do not match';
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
      confirmPassword: isConfirmPasswordDirty ? validateConfirmPassword(value, confirmPassword) : '',
    }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsConfirmPasswordDirty(true);
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: validateConfirmPassword(password, value),
    }));
  };

  useEffect(() => {
    const isFormValid =
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '';
    setIsFormValid(isFormValid);
  }, [errors, email, password, confirmPassword]);

  const handleSignup = () => {
    if (isFormValid) {
      // Handle signup logic here
      navigate('/setup');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="signup">
      <Welcome />
      <div className="signup__form">
        <label htmlFor="email" className="signup__label">Email</label>
        <input
          type="email"
          id="email"
          className={`signup__input ${errors.email ? 'error-border' : ''}`}
          value={email}
          onChange={handleEmailChange}
          required
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}
        <label htmlFor="password" className="signup__label">Password</label>
        <input
          type="password"
          id="password"
          className={`signup__input ${errors.password ? 'error-border' : ''}`}
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {errors.password && <span className="error-msg">{errors.password}</span>}
        <label htmlFor="confirmPassword" className="signup__label">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          className={`signup__input ${errors.confirmPassword ? 'error-border' : ''}`}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
        <button className="signup__button signup__button--primary" onClick={handleSignup} disabled={!isFormValid}>Sign Up</button>
        <button className="signup__button signup__button--secondary" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Signup;
