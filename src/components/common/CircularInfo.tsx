import React from 'react';

interface CircularInfoProps {
  label: string;
  value: string | number;
  color?: string;
}

const CircularInfo: React.FC<CircularInfoProps> = ({ label, value, color = "cadetblue" }) => {
  return (
    <div className="circular-info" style={{ color }}>
      <p className="circular-info__label">{label}</p>
      <div className="circular-info__value" style={{ borderColor: color }}>{value}</div>
    </div>
  );
};

export default CircularInfo;
