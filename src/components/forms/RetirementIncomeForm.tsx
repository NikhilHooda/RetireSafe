import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRetirementIncome } from '../../redux/actions';
import { RetirementIncome, GlobalState } from '../../types';
import FormGroup from '../common/FormGroup';
import { ICONS } from '../../utils/icons';
import RetirementIncomePieChart from './RetirementIncomePieChart';

interface RetirementIncomeFormProps {
  layout: "two-column" | "stacked";
  showPieChart: boolean;
}

const RetirementIncomeForm: React.FC<RetirementIncomeFormProps> = ({ layout, showPieChart }) => {
  const dispatch = useDispatch();
  const retirementIncome = useSelector((state: GlobalState) => state.retirementIncome);
  const [formState, setFormState] = useState(retirementIncome);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // useEffect(() => {
  //   setFormState(retirementIncome);
  // }, [retirementIncome]);

  const validate = (name: string, value: string) => {
    let error = '';
    const numValue = Number(value);
    if (!value) {
      error = 'Required Field';
    } else if (!/^\d+$/.test(value)) {
      error = 'Only numbers allowed';
    } else if (name === 'cpp' || name === 'oas' || name === 'spouseCpp' || name === 'spouseOas') {
      if (numValue < 0 || numValue > 2000) {
        error = 'Enter a value between 0 to 2000';
      }
    } else if (name === 'pension' || name === 'spousePension') {
      if (numValue < 0 || numValue > 20000) {
        error = 'Enter a value between 0 to 20000';
      }
    } else if (name === 'otherRetirementIncome') {
      if (numValue < 0 || numValue > 50000) {
        error = 'Enter a value between 0 to 50000';
      }
    }
    return error;
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormState((prevState: RetirementIncome) => ({
  //     ...prevState,
  //     [name]: Number(value) ? Number(value) : value
  //   }));
  //   const error = validate(name, value);
  //   setErrors(prevErrors => {
  //     const updatedErrors = { ...prevErrors, [name]: error };
  //     if (!error && !Object.values(updatedErrors).some(err => err !== '')) {
  //       dispatch(updateRetirementIncome({
  //         cpp: formState.cpp || 0,
  //         oas: formState.oas || 0,
  //         pension: formState.pension || 0,
  //         spousePension: formState.spousePension || 0,
  //         spouseCpp: formState.spouseCpp || 0,
  //         spouseOas: formState.spouseOas || 0,
  //         otherRetirementIncome: formState.otherRetirementIncome || 0,
  //       }));
  //     }
  //     return updatedErrors;
  //   });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState: RetirementIncome) => ({
      ...prevState,
      [name]: Number(value) ? Number(value) : value
    }));
    const error = validate(name, value);
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors, [name]: error };
      return updatedErrors;
    });
  };

  useEffect(() => {
    if (!Object.values(errors).some(err => err !== '')) {
      dispatch(updateRetirementIncome({
        cpp: formState.cpp || 0,
        oas: formState.oas || 0,
        pension: formState.pension || 0,
        spousePension: formState.spousePension || 0,
        spouseCpp: formState.spouseCpp || 0,
        spouseOas: formState.spouseOas || 0,
        otherRetirementIncome: formState.otherRetirementIncome || 0,
      }));
    }
  }, [formState, errors, dispatch]);

  return (
    <div className="form-container retirement-income-form-container">
      {showPieChart && <RetirementIncomePieChart usage="form" />}
      <form className={`retirement-income-form ${layout}`}>
        <FormGroup
          id="cpp"
          name="cpp"
          label="CPP at age 65 per month"
          value={formState.cpp}
          error={errors.cpp}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText="Enter a value between 0 to 2000"
        />
        <FormGroup
          id="spouseCpp"
          name="spouseCpp"
          label="Spouse CPP at age 65 per month"
          value={formState.spouseCpp}
          error={errors.spouseCpp}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText="Enter a value between 0 to 2000"
        />
        <FormGroup
          id="oas"
          name="oas"
          label="OAS at age 65 per month"
          value={formState.oas}
          error={errors.oas}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText="Enter a value between 0 to 2000"
        />
        <FormGroup
          id="spouseOas"
          name="spouseOas"
          label="Spouse OAS at age 65 per month"
          value={formState.spouseOas}
          error={errors.spouseOas}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText="Enter a value between 0 to 2000"
        />
        <FormGroup
          id="pension"
          name="pension"
          label="Pension at retirement per month"
          value={formState.pension}
          error={errors.pension}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 20000'
        />
        <FormGroup
          id="spousePension"
          name="spousePension"
          label="Spouse Pension at retirement per month"
          value={formState.spousePension}
          error={errors.spousePension}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 20000'
        />
        <FormGroup
          id="otherRetirementIncome"
          name="otherRetirementIncome"
          label="Other retirement income per month (Pension, rent etc.)"
          value={formState.otherRetirementIncome}
          error={errors.otherRetirementIncome}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 50000'
        />
      </form>
    </div>
  );
};

export default RetirementIncomeForm;