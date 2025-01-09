import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFutureInvestments } from '../../redux/actions';
import { FutureInvestments, GlobalState } from '../../types';
import FormGroup from '../common/FormGroup';
import { ICONS } from '../../utils/icons';
import FutureInvestmentsPieChart from './FutureInvestmentsPieChart';

interface FutureInvestmentsFormProps {
  layout: "two-column" | "stacked";
  showPieChart: boolean;
}

const FutureInvestmentsForm: React.FC<FutureInvestmentsFormProps> = ({ layout, showPieChart }) => {
  const dispatch = useDispatch();
  const futureInvestments = useSelector((state: GlobalState) => state.futureInvestments);
  const [formState, setFormState] = useState(futureInvestments);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // useEffect(() => {
  //   setFormState(futureInvestments);
  // }, [futureInvestments]);

  const validate = (name: string, value: string) => {
    let error = '';
    const numValue = Number(value);
    if (!value) {
      error = 'Required Field';
    } else if (!/^\d+$/.test(value)) {
      error = 'Only numbers allowed';
    } else if (numValue < 0 || numValue > 1000000) {
      error = 'Enter a value between 0 to 1000000';
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState: FutureInvestments) => ({
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
      dispatch(updateFutureInvestments({
        futureAnnualRrsp: formState.futureAnnualRrsp || 0,
        futureAnnualTfsa: formState.futureAnnualTfsa,
        futureAnnualNonRegisteredInvestments: formState.futureAnnualNonRegisteredInvestments || 0,
        spouseFutureAnnualRrsp: formState.spouseFutureAnnualRrsp || 0,
        spouseFutureAnnualTfsa: formState.spouseFutureAnnualTfsa || 0,
        spouseFutureAnnualNonRegisteredInvestments: formState.spouseFutureAnnualNonRegisteredInvestments || 0,
      }));
    }
  }, [formState, errors, dispatch]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   const numValue = Number(value);
  //   setFormState((prevState: FutureInvestments) => ({
  //     ...prevState,
  //     [name]: numValue
  //   }));
  //   const error = validate(name, value);
  //   setErrors(prevErrors => {
  //     const updatedErrors = { ...prevErrors, [name]: error };
  //     if (!error && !Object.values(updatedErrors).some(err => err !== '')) {
  //       dispatch(updateFutureInvestments({
  //         futureAnnualRrsp: Number(formState.futureAnnualRrsp),
  //         futureAnnualTfsa: Number(formState.futureAnnualTfsa),
  //         futureAnnualNonRegisteredInvestments: Number(formState.futureAnnualNonRegisteredInvestments),
  //         spouseFutureAnnualRrsp: Number(formState.spouseFutureAnnualRrsp),
  //         spouseFutureAnnualTfsa: Number(formState.spouseFutureAnnualTfsa),
  //         spouseFutureAnnualNonRegisteredInvestments: Number(formState.spouseFutureAnnualNonRegisteredInvestments),
  //       }));
  //     }
  //     return updatedErrors;
  //   });
  // };
  
  return (
    <div className="form-container future-investments-form-container">
      {showPieChart && <FutureInvestmentsPieChart usage="form" />}
      <form className={`future-investments-form ${layout}`}>
        <FormGroup
          id="futureAnnualRrsp"
          name="futureAnnualRrsp"
          label="Future RRSP every year"
          value={formState.futureAnnualRrsp}
          error={errors.futureAnnualRrsp}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 1000000'
        />
        <FormGroup
          id="futureAnnualTfsa"
          name="futureAnnualTfsa"
          label="Future TFSA every year"
          value={formState.futureAnnualTfsa}
          error={errors.futureAnnualTfsa}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 1000000'
        />
        <FormGroup
          id="futureAnnualNonRegisteredInvestments"
          name="futureAnnualNonRegisteredInvestments"
          label="Future Non-registered Investments every year"
          value={formState.futureAnnualNonRegisteredInvestments}
          error={errors.futureAnnualNonRegisteredInvestments}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 1000000'
        />
        <FormGroup
          id="spouseFutureAnnualRrsp"
          name="spouseFutureAnnualRrsp"
          label="Spouse Future RRSP every year"
          value={formState.spouseFutureAnnualRrsp}
          error={errors.spouseFutureAnnualRrsp}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 1000000'
        />
        <FormGroup
          id="spouseFutureAnnualTfsa"
          name="spouseFutureAnnualTfsa"
          label="Spouse Future TFSA every year"
          value={formState.spouseFutureAnnualTfsa}
          error={errors.spouseFutureAnnualTfsa}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 1000000'
        />
        <FormGroup
          id="spouseFutureAnnualNonRegisteredInvestments"
          name="spouseFutureAnnualNonRegisteredInvestments"
          label="Spouse Future Non-registered Investments every year"
          value={formState.spouseFutureAnnualNonRegisteredInvestments}
          error={errors.spouseFutureAnnualNonRegisteredInvestments}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter a value between 0 to 1000000'
        />
      </form>
    </div>
  );
};

export default FutureInvestmentsForm;