import React from 'react';
import { ICONS } from '../../utils/icons';
import '../../styles/welcome.scss';

const Welcome: React.FC = () => {
  return (
    <div className="welcome">
      <div className="welcome__icon">{ICONS.plans_icon_white_30}</div>
      <h1 className="welcome__heading">RetireSafe</h1>
      <p className="welcome__description">An app to project and simulate your finances during retirement</p>
    </div>
  );
};

export default Welcome;
