import React from 'react';

interface FormGroupProps {
  id: string;
  name: string;
  label: string;
  value: number | string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  inputInfoText: string;
  required?: boolean;
}

const FormGroup: React.FC<FormGroupProps> = ({ id, name, label, value, error, onChange, icon, inputInfoText, required = false }) => {
  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor={id}>{label}{required && <sup>*</sup>}</label>
      <span className="form-group__input-container">
        <span className="form-group__icon">
          {icon}
        </span>
        <input
          type="text"
          className={`form-group__input ${error ? 'error-border' : ''}`}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-describedby={`${id}Error`}
          pattern="\d*"
        />
      </span>
      <span id={`${id}Error`} className={error ? "error-msg form-group__input__error-msg" : "input__field-info form-group__input__field-info"}>
        {error || inputInfoText}
      </span>
    </div>
  );
};

export default FormGroup;
