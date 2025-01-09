import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/setup.scss';
import { ICONS } from '../../utils/icons';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import CurrentInvestmentsForm from '../forms/CurrentInvestmentsForm';
import FutureInvestmentsForm from '../forms/FutureInvestmentsForm';
import AssumptionsForm from '../forms/AssumptionsForm';
import RetirementGoalsForm from '../forms/RetirementGoalsForm';
import RetirementIncomeForm from '../forms/RetirementIncomeForm';

const Setup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep === 7) {
      navigate('/app');
    }
  }, [currentStep, navigate]);

  const handleNext = () => {
    if (isStepValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsStepValid(isValid);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2>Personal Information</h2>
            <PersonalInfoForm layout="two-column" onValidationChange={handleValidationChange} />
          </>
        );
      case 2:
        return <CurrentInvestmentsForm layout="two-column" showPieChart={true}/>;
      case 3:
        return <FutureInvestmentsForm layout="two-column" showPieChart={true}/>;
      case 4:
        return <RetirementIncomeForm layout="two-column" showPieChart={true}/>;
      case 5:
        return (
          <>
            <h2>Assumptions</h2>
            <AssumptionsForm layout="two-column" />
          </>
        );
      case 6:
        return (
          <>
            <h2>Retirement Goals</h2>
            <RetirementGoalsForm layout="two-column"  onValidationChange={handleValidationChange} />
          </>
        );
      case 7:
        return null; // Navigation will happen in useEffect
      default:
        return null;
    }
  };

  return (
    <div className="setup">
      <div className="setup__header">
        <div className="setup__header__logo">
          <div className="setup__header__logo__icon">{ICONS.plans_icon_white_30}</div>
          <h1 className="setup__header__logo__heading">Retirement Planning App</h1>
        </div>
        <button className="setup__header__signin" onClick={() => navigate('/signin')}>Sign in</button>
      </div>
      <h1 className="setup__heading">Let's build your Retirement Plan!</h1>
      <p className="setup__description">Enter your information through a simple step-by-step process. In just a few moments, you'll be viewing some impressive projections.</p>
      <div className="setup__progress-bar">
        <div className="setup__progress-bar__fill" style={{ width: `${(currentStep / 6) * 100}%` }}></div>
      </div>
      <div className="setup__content">
        {renderStepContent()}
      </div>
      <div className="setup__buttons">
        <button className="setup__button" onClick={handleBack} disabled={currentStep === 1}>Back</button>
        <button className="setup__button" onClick={handleNext} disabled={!isStepValid}>{currentStep === 6 ? 'Finish' : 'Continue'}</button>
      </div>
    </div>
  );
};

export default Setup;
