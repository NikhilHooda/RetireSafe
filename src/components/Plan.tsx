import React, { useState } from "react";
import Summary from './Summary';
import Charts from './Charts';
import CurrentInvestmentsForm from './forms/CurrentInvestmentsForm';
import FutureInvestmentsForm from './forms/FutureInvestmentsForm';
import RetirementIncomeForm from './forms/RetirementIncomeForm';
import AssumptionsForm from './forms/AssumptionsForm';
import { ICONS } from '../utils/icons';

const Plan: React.FC = () => {
  const [openSection, setOpenSection] = useState<string>("");

  const handleSectionClick = (section: string) => {
    setOpenSection(prevSection => {
      return prevSection === section ? "" : section;});
  };

  // const getSectionWidth = (section: string) => {
  //   if (openSection.length === 0) return '25%';
  //   if (openSection.length === 1) {
  //     return openSection === section ? '40%' : '20%';
  //   }
  //   return '25%';
  // };

  const getSectionWidth = (section: string) => {
    // if there is an open section, open section width is 40% and other sections is 20%
    // If no open section then all sections are 25%
    if (openSection.length === 0) return '25%';
    if (openSection.length >= 1) {
      return openSection === section ? '40%' : '20%';
    }
    return '25%';
  };

  return (
    <div className="app__main-section__plan">
      <div className="app__main-section__plan__main-section">
        <div className="plan__charts">
          <Charts />
        </div>
        <div className="plan__inputs">
          <div className="sections">
            <div className={`section ${openSection === 'currentFinances' ? 'section-open' : ''}`} style={{ width: getSectionWidth('currentFinances') }}>
              <button
                className="section__cta"
                onClick={() => handleSectionClick('currentFinances')}
              >
                  <span className="section__cta__icon">
                      {ICONS.investment_icon_white_15}
                  </span>
                  <span>Current Finances</span>
              </button>
              {openSection === 'currentFinances' && (
                <div className="section__content">
                  <CurrentInvestmentsForm layout={"stacked"} showPieChart={false} />
                </div>
              )}
            </div>
            <div className={`section ${openSection === 'futureInvestments' ? 'section-open' : ''}`} style={{ width: getSectionWidth('futureInvestments') }}>
              <button
                className="section__cta"
                onClick={() => handleSectionClick('futureInvestments')}
              >
                  <span className="section__cta__icon">
                      {ICONS.investment_icon_white_15}
                  </span>
                  <span>Future Investment</span>
              </button>
              {openSection === 'futureInvestments' && (
                <div className="section__content">
                  <FutureInvestmentsForm layout={"stacked"} showPieChart={false} />
                </div>
              )}
            </div>
            <div className={`section ${openSection === 'retirementIncome' ? 'section-open' : ''}`} style={{ width: getSectionWidth('retirementIncome') }}>
              <button
                className="section__cta"
                onClick={() => handleSectionClick('retirementIncome')}
              >
                  <span className="section__cta__icon">
                      {ICONS.investment_icon_white_15}
                  </span>
                  <span>Retirement Income</span>
              </button>
              {openSection === 'retirementIncome' && (
                <div className="section__content">
                  <RetirementIncomeForm layout={"stacked"} showPieChart={false} />
                </div>
              )}
            </div>
            <div className={`section ${openSection === 'assumptions' ? 'section-open' : ''}`} style={{ width: getSectionWidth('assumptions') }}>
              <button
                className="section__cta"
                onClick={() => handleSectionClick('assumptions')}
              >
                  <span className="section__cta__icon">
                      {ICONS.investment_icon_white_15}
                  </span>
                  <span>Assumptions</span>
              </button>
              {openSection === 'assumptions' && (
                <div className="section__content">
                  <AssumptionsForm layout={"stacked"} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="app__main-section__plan__summary">
          <Summary />
      </div>
    </div>
  );
};

export default Plan;
