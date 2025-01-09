import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlanRetirementGoals } from '../../redux/actions';
import { RetirementGoals, GlobalState, RetirementPlan } from '../../types';
import FormGroup from '../common/FormGroup';
import { ICONS } from '../../utils/icons';

interface RetirementGoalsFormProps {
  layout: "two-column" | "stacked";
  onValidationChange?: (isValid: boolean) => void;
}

const RetirementGoalsForm: React.FC<RetirementGoalsFormProps> = ({ layout, onValidationChange }) => {
  const dispatch = useDispatch();
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);
  const selectedPlan = useSelector((state: GlobalState) => state.ui.selectedPlan);
  const personalInfo = useSelector((state: GlobalState) => state.personalInfo);
  const currentPlan: RetirementPlan | undefined = retirementPlans.find(plan => plan.planId === selectedPlan);
  const retirementGoals = currentPlan ? currentPlan.retirementGoals : {} as RetirementGoals;
  const [formState, setFormState] = useState(retirementGoals);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormState(retirementGoals);
  }, [selectedPlan]);

  const validate = (name: string, value: string) => {
    let error = '';
    const numValue = Number(value);
    if (!value) {
      error = 'Required Field';
    } else if (!/^\d+$/.test(value)) {
      error = 'Only numbers allowed';
    } else if (name === 'retirementStartingAge') {
      if (numValue <= personalInfo.currentAge || numValue >= 89) {
        error = `Enter a value more than ${personalInfo.currentAge} and less than 89`;
      }
    } else if (name === 'retirementEndingAge') {
      if (numValue <= formState.retirementStartingAge || numValue >= 100) {
        error = 'Enter a value more than retirement starting age and less than 100';
      }
    } else if (name === 'desiredRetirementIncome') {
      if (numValue < 1000 || numValue > 1000000) {
        error = 'Enter a value between 1000 to 1000000';
      }
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevState: RetirementGoals) => ({
      ...prevState,
      [name]: name === "withdrawalOrder" ? value : Number(value)
    }));
    const error = validate(name, value);
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors, [name]: error };
      return updatedErrors;
    });
  };

  useEffect(() => {
    if (!Object.values(errors).some(err => err !== '') && selectedPlan) {
      dispatch(updatePlanRetirementGoals(selectedPlan, {
        retirementStartingAge: Number(formState.retirementStartingAge) || 0,
        retirementEndingAge: Number(formState.retirementEndingAge) || 0,
        desiredRetirementIncome: Number(formState.desiredRetirementIncome) || 0,
        cppStartAge: Number(formState.cppStartAge) || 0,
        oasStartAge: Number(formState.oasStartAge) || 0,
        withdrawalOrder: formState.withdrawalOrder || '',
      }));
    }
  }, [formState, errors, selectedPlan, dispatch]);

  useEffect(() => {
    const isFormValid = !Object.values(errors).some(err => err !== '') && formState.retirementStartingAge > personalInfo.currentAge && formState.retirementStartingAge < 90 && formState.retirementEndingAge > formState.retirementStartingAge && formState.retirementEndingAge < 101;
    onValidationChange && onValidationChange(isFormValid);
  }, [formState, errors, personalInfo.currentAge, onValidationChange]);

  return (
    <div className="form-container retirement-goals-form-container">
      <form className={`retirement-goals-form ${layout}`}>
        <FormGroup
          id="retirementStartingAge"
          name="retirementStartingAge"
          label="Retirement Starting Age"
          value={formState.retirementStartingAge}
          error={errors.retirementStartingAge}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText={`Enter a value more than ${personalInfo.currentAge} and less than 89`}
          required
        />
        <FormGroup
          id="retirementEndingAge"
          name="retirementEndingAge"
          label="Retirement Ending Age"
          value={formState.retirementEndingAge}
          error={errors.retirementEndingAge}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value more than retirement starting age and less than 100'
          required
        />
        <FormGroup
          id="desiredRetirementIncome"
          name="desiredRetirementIncome"
          label="Desired Retirement Income"
          value={formState.desiredRetirementIncome}
          error={errors.desiredRetirementIncome}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 1000 to 1000000'
          required
        />
        <div className="form-group">
            <label className="form-group__label" htmlFor="cppStartAge">What age to start CPP (between 60 to 70):</label>
            <span className="form-group__input-container">
                <span className="form-group__icon">
                    {ICONS.investment_icon_white_30}
                </span>
                <select
                    id="cppStartAge"
                    name="cppStartAge"
                    value={formState.cppStartAge}
                    onChange={handleChange}
                    required
                    aria-describedby="cppStartAgeError"
                    className={`form-group__input ${errors.cppStartAge ? 'error-border' : ''}`}
                    >
                    {[...Array(11).keys()].map(i => (
                        <option key={i} value={60 + i}>{60 + i}</option>
                    ))}
                </select>
            </span>
        </div>
        <div className="form-group">
            <label className="form-group__label" htmlFor="oasStartAge">What age to start OAS (between 65 to 70):</label>
            <span className="form-group__input-container">
                <span className="form-group__icon">
                    {ICONS.investment_icon_white_30}
                </span>
                <select
                    id="oasStartAge"
                    name="oasStartAge"
                    value={formState.oasStartAge}
                    onChange={handleChange}
                    required
                    aria-describedby="oasStartAgeError"
                    className={`form-group__input ${errors.oasStartAge ? 'error-border' : ''}`}
                    >
                    {[...Array(6).keys()].map(i => (
                        <option key={i} value={65 + i}>{65 + i}</option>
                    ))}
                </select>
            </span>
        </div>
        <div className="form-group">
            <label className="form-group__label" htmlFor="withdrawalOrder">Order in which to take money out:</label>
            <span className="form-group__input-container">
                <span className="form-group__icon">
                    {ICONS.investment_icon_white_30}
                </span>
                <select
                    id="withdrawalOrder"
                    name="withdrawalOrder"
                    value={formState.withdrawalOrder}
                    onChange={handleChange}
                    className='form-group__input'
                    >
                    <option value="RRSP/Investment in equal proportion and then TFSA">RRSP/Investment in equal proportion and then TFSA</option>
                    <option value="All three in equal proportion">All three in equal proportion</option>
                    <option value="TFSA first and then RRSP/Investment in equal proportion">TFSA first and then RRSP/Investment in equal proportion</option>
                </select>
            </span>
        </div>
      </form>
    </div>
  );
};

export default RetirementGoalsForm;