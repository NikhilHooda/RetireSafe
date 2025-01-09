import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssumptions } from '../../redux/actions';
import { Assumptions, GlobalState } from '../../types';
import FormGroup from '../common/FormGroup';
import { ICONS } from '../../utils/icons';

interface AssumptionsFormProps {
  layout: "two-column" | "stacked" | "three-column";
}

const AssumptionsForm: React.FC<AssumptionsFormProps> = ({ layout }) => {
  const dispatch = useDispatch();
  const assumptions = useSelector((state: GlobalState) => state.assumptions);
  const [formState, setFormState] = useState(assumptions);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // useEffect(() => {
  //   setFormState(assumptions);
  // }, [assumptions]);

  const validate = (name: string, value: string) => {
    let error = '';
    // if (name === 'simulationData') {
    //   return '';
    // }
    const numValue = Number(value);
    if (!value) {
      error = 'Required Field';
    } else if (!/^\d+$/.test(value)) {
      error = 'Only numbers allowed';
    } else if (name === 'inflationRate' && (numValue < 0 || numValue > 10)) {
      error = 'Enter a value between 0 to 10%';
    } else if ((name === 'investmentGrowthRate' || name === 'standardDeviation') && (numValue < 1 || numValue > 50)) {
      error = 'Enter a value between 0 to 50%';
    }
    return error;
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormState((prevState: Assumptions) => ({
  //     ...prevState,
  //     [name]: Number(value) ? Number(value) : value
  //   }));
  //   const error = validate(name, value);
  //   setErrors(prevErrors => {
  //     const updatedErrors = { ...prevErrors, [name]: error };
  //     if (!error && !Object.values(updatedErrors).some(err => err !== '')) {
  //       dispatch(updateAssumptions({
  //         inflationRate: formState.inflationRate || 0,
  //         investmentGrowthRate: formState.investmentGrowthRate || 0,
  //       }));
  //     }
  //     return updatedErrors;
  //   });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevState: Assumptions) => ({
      ...prevState,
      // [name]: name === "simulationData" ? value : Number(value)
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
      dispatch(updateAssumptions({
        inflationRate: formState.inflationRate || 0,
        investmentGrowthRate: formState.investmentGrowthRate || 0,
        standardDeviation: formState.standardDeviation || 0,
        // simulationData: formState.simulationData || 'Use S&P 500 Historical data',
    }));
    }
  }, [formState, errors, dispatch]);

  return (
    <div className="form-container assumptions-form-container">
      <form className={`assumptions-form ${layout}`}>
        <FormGroup
          id="inflationRate"
          name="inflationRate"
          label="Inflation Rate (%)"
          value={formState.inflationRate}
          error={errors.inflationRate}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 10%'
        />
        <FormGroup
          id="investmentGrowthRate"
          name="investmentGrowthRate"
          label="Investment growth rate (%)"
          value={formState.investmentGrowthRate}
          error={errors.investmentGrowthRate}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 50%'
        />
        <FormGroup
          id="standardDeviation"
          name="standardDeviation"
          label="Custom Standard Deviation"
          value={formState.standardDeviation}
          error={errors.standardDeviation}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 50%'
        />
      </form>
    </div>
  );
};

export default AssumptionsForm;