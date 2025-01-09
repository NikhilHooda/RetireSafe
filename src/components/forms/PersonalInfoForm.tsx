import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonalInfo } from "../../redux/actions";
import { PersonalInfo, GlobalState } from "../../types";
import FormGroup from "../common/FormGroup";
import { ICONS } from "../../utils/icons";

interface PersonalInfoFormProps {
  layout: "two-column" | "stacked";
  onValidationChange: (isValid: boolean) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ layout, onValidationChange }) => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: GlobalState) => state.personalInfo);
  const [formState, setFormState] = useState(personalInfo);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // useEffect(() => {
  //   setFormState(personalInfo);
  // }, [personalInfo]);

  const validate = (name: string, value: string) => {
    let error = "";
    if (!value) {
      error = "Required Field";
    } else if (name === "name" || name === "spouseName") {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        error = "Only characters allowed";
      }
    } else if (name === "currentAge" || name === "spouseCurrentAge") {
      if (!/^\d+$/.test(value)) {
        error = "Only numbers allowed";
      } else {
        const age = Number(value);
        if (age < 18 || age > 80) {
          error = "Enter age between 18 and 80";
        }
      }
    }
    return error;
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormState((prevState: PersonalInfo) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  //   const error = validate(name, value);
  //   setErrors((prevErrors) => {
  //     const updatedErrors = { ...prevErrors, [name]: error };
  //     if (!error && !Object.values(updatedErrors).some((err) => err !== "")) {
  //       const updatedInfo = {
  //         ...formState,
  //         [name]: value,
  //       };
  //       dispatch(
  //         updatePersonalInfo({
  //           name: updatedInfo.name,
  //           currentAge: Number(updatedInfo.currentAge),
  //           spouseName: updatedInfo.spouseName,
  //           spouseCurrentAge: Number(updatedInfo.spouseCurrentAge),
  //         })
  //       );
  //     }
  //     return updatedErrors;
  //   });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState: PersonalInfo) => ({
      ...prevState,
      [name]: value
    }));
    const error = validate(name, value);
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors, [name]: error };
      return updatedErrors;
    });
  };

  useEffect(() => {
    if (!Object.values(errors).some(err => err !== '')) {
      dispatch(updatePersonalInfo({
        name: formState.name,
        currentAge: Number(formState.currentAge) || 0,
        spouseName: formState.spouseName,
        spouseCurrentAge: Number(formState.spouseCurrentAge) || 0,
    }));
    }
  }, [formState, errors, dispatch]);

  useEffect(() => {
    const isFormValid = !Object.values(errors).some(err => err !== '') && formState.name.trim() !== '' && formState.spouseName.trim() !== '' && Number(formState.currentAge) > 0 && Number(formState.spouseCurrentAge) > 0;
    onValidationChange(isFormValid);
  }, [formState, errors, onValidationChange]);

  return (
    <div className="form-container personal-info-form-container">
      <form className={`personal-info-form ${layout}`}>
        <FormGroup
          id="name"
          name="name"
          label="Name"
          value={formState.name}
          error={errors.name}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Only characters allowed'
          required={true}
        />
        <FormGroup
          id="spouseName"
          name="spouseName"
          label="Spouse Name"
          value={formState.spouseName}
          error={errors.spouseName}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Only characters allowed'
          required={true}
        />
        <FormGroup
          id="currentAge"
          name="currentAge"
          label="Current Age"
          value={formState.currentAge}
          error={errors.currentAge}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter age between 18 and 80'
          required={true}
        />
        <FormGroup
          id="spouseCurrentAge"
          name="spouseCurrentAge"
          label="Spouse Current Age"
          value={formState.spouseCurrentAge}
          error={errors.spouseCurrentAge}
          onChange={handleChange}
          icon={ICONS.investment_icon_white_30}
          inputInfoText='Enter age between 18 and 80'
          required={true}
        />
      </form>
    </div>
  );
};

export default PersonalInfoForm;
