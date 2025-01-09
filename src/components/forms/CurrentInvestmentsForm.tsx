import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentInvestments } from '../../redux/actions';
import { CurrentInvestments, GlobalState } from '../../types';
import CurrentInvestmentsPieChart from './CurrentInvestmentsPieChart';
import FormGroup from '../common/FormGroup';
import { ICONS } from '../../utils/icons';

interface CurrentInvestmentsFormProps {
  layout: "two-column" | "stacked";
  showPieChart: boolean;
}

const CurrentInvestmentsForm: React.FC<CurrentInvestmentsFormProps> = ({ layout, showPieChart }) => {
  const dispatch = useDispatch();
  const currentInvestments = useSelector((state: GlobalState) => state.currentInvestments);
  const [formState, setFormState] = useState(currentInvestments);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // useEffect(() => {
  //   setFormState(currentInvestments);
  // }, [currentInvestments]);

  const validate = (name: string, value: string) => {
    let error = '';
    const numValue = Number(value);
    if (!value) {
      error = 'Required Field';
    } else if (!/^\d+$/.test(value)) {
      error = 'Only numbers allowed';
    } else if (numValue < 0 || numValue > 5000000) {
      error = 'Enter a value between 0 to 5000000';
    }
    return error;
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   const numValue = Number(value);
  //   setFormState((prevState: CurrentInvestments) => ({
  //     ...prevState,
  //     [name]: numValue
  //   }));
  //   const error = validate(name, value);
  //   setErrors(prevErrors => {
  //     const updatedErrors = { ...prevErrors, [name]: error };
  //     if (!error && !Object.values(updatedErrors).some(err => err !== '')) {
  //       dispatch(updateCurrentInvestments({
  //         rrsp: Number(formState.rrsp) || 0,
  //         tfsa: Number(formState.tfsa) || 0,
  //         nonRegisteredInvestments: Number(formState.nonRegisteredInvestments) || 0,
  //         spouseRrsp: Number(formState.spouseRrsp) || 0,
  //         spouseTfsa: Number(formState.spouseTfsa) || 0,
  //         spouseNonRegisteredInvestments: Number(formState.spouseNonRegisteredInvestments) || 0,
  //       }));
  //     }
  //     return updatedErrors;
  //   });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState: CurrentInvestments) => ({
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
      dispatch(updateCurrentInvestments({
        rrsp: formState.rrsp || 0,
        tfsa: formState.tfsa || 0,
        nonRegisteredInvestments: formState.nonRegisteredInvestments || 0,
        spouseRrsp: formState.spouseRrsp || 0,
        spouseTfsa: formState.spouseTfsa || 0,
        spouseNonRegisteredInvestments: formState.spouseNonRegisteredInvestments || 0,
      }));
    }
  }, [formState, errors, dispatch]);

  const chartSettings = {
    legend: "bottom",
    // width: 300,
    // height: 300
  }

  return (
    <div className="form-container current-investments-form-container">
      {showPieChart && <CurrentInvestmentsPieChart usage="form" />}
      <form className={`current-investments-form ${layout}`}>
        <FormGroup
          id="rrsp"
          name="rrsp"
          label="RRSP"
          value={formState.rrsp}
          error={errors.rrsp}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 5000000'
        />
        <FormGroup
          id="spouseRrsp"
          name="spouseRrsp"
          label="Spouse RRSP"
          value={formState.spouseRrsp}
          error={errors.spouseRrsp}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 5000000'
        />
        <FormGroup
          id="tfsa"
          name="tfsa"
          label="TFSA"
          value={formState.tfsa}
          error={errors.tfsa}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 5000000'
        />
        <FormGroup
          id="spouseTfsa"
          name="spouseTfsa"
          label="Spouse TFSA"
          value={formState.spouseTfsa}
          error={errors.spouseTfsa}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 5000000'
        />
        <FormGroup
          id="nonRegisteredInvestments"
          name="nonRegisteredInvestments"
          label="Non-registered Investments"
          value={formState.nonRegisteredInvestments}
          error={errors.nonRegisteredInvestments}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 5000000'
        />
        <FormGroup
          id="spouseNonRegisteredInvestments"
          name="spouseNonRegisteredInvestments"
          label="Spouse Non-registered Investments"
          value={formState.spouseNonRegisteredInvestments}
          error={errors.spouseNonRegisteredInvestments}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 5000000'
        />
      </form>
    </div>
  );
};

export default CurrentInvestmentsForm;