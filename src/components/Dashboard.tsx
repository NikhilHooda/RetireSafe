import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../types';
import CurrentInvestmentsPieChart from './forms/CurrentInvestmentsPieChart';
import FutureInvestmentsPieChart from './forms/FutureInvestmentsPieChart';
import RetirementIncomePieChart from './forms/RetirementIncomePieChart';
import { setSelectedPlan, setSelectedSection } from '../redux/actions';
import CircularInfo from './common/CircularInfo';
import { getLegacyColor, getSuccessColor } from '../utils/utils';
import IncomeProjectionsBarChart from './incomeProjections/IncomeProjectionsBarChart';
import { formatNetEstateValue } from '../utils/formatters';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  // const calculatedState = useSelector((state: GlobalState) => state.calculatedState);
  const assumptions = useSelector((state: GlobalState) => state.assumptions);
  // const simulationResults = useSelector((state: GlobalState) => state.simulationResults);
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);

  // const netWorthAtRetirement = calculatedState.openingBalanceRRSP + calculatedState.openingBalanceTFSA + calculatedState.openingBalanceNonRegisteredInvestments;

  const handleEditClick = (section: string) => {
    dispatch(setSelectedSection(section));
  };

  const handlePlanClick = (planId: string) => {
    dispatch(setSelectedSection('plan'))
    dispatch(setSelectedPlan(planId))
  };

  return (
    <div className="app__dashboard">
      <div className="app__dashboard__inputs">
        <div className="app__dashboard__inputs__item">
            <CurrentInvestmentsPieChart usage="dashboard" />
            <button className="app__dashboard__inputs__item__btn" onClick={() => handleEditClick('currentFinances')}>
              Edit current investments
            </button>
        </div>
        <div className="app__dashboard__inputs__item">
            <FutureInvestmentsPieChart usage="dashboard" />
            <button className="app__dashboard__inputs__item__btn" onClick={() => handleEditClick('futureInvestments')}>
              Edit future investments
            </button>
        </div>
        <div className="app__dashboard__inputs__item">
            <RetirementIncomePieChart usage="dashboard" />
            <button className="app__dashboard__inputs__item__btn" onClick={() => handleEditClick('retirementIncome')}>
              Edit retirement income
            </button>
        </div>
      </div>
      <div className="app__dashboard__assumptions">
        <div className="app__dashboard__assumptions__items">
          <div className="app__dashboard__assumptions__items__item">
            <h3>Assumptions: </h3>
            <button className="app__dashboard__inputs__item__btn" onClick={() => handleEditClick('assumptions')}>
                <i className="fas fa-edit"></i>
            </button>
          </div>
          <p className="app__dashboard__assumptions__items__item">Inflation Rate: {assumptions.inflationRate}%</p>
          <p className="app__dashboard__assumptions__items__item">Investment Growth Rate: {assumptions.investmentGrowthRate}%</p>
          <p className="app__dashboard__assumptions__items__item">Standard Deviation: {assumptions.standardDeviation}%</p>
        </div>
        {/* <button className="app__dashboard__inputs__item__btn" onClick={() => handleEditClick('assumptions')}>
          Edit assumptions
        </button> */}
      </div>
      <div className="app__dashboard__plans">
        {retirementPlans?.map((plan, index) => (
          <div key={index} className="app__dashboard__plans__plan">
            <div key={index} className="app__dashboard__plans__plan__item">
              <div className="plan-details">
                <button className="app__dashboard__inputs__item__btn" onClick={() => handlePlanClick(plan.planId)}>
                    {plan.planName}
                </button>
                <p>Retirement begins at age {plan.retirementGoals?.retirementStartingAge} and ends at age {plan.retirementGoals?.retirementEndingAge}. CPP begins at age {plan.retirementGoals?.cppStartAge} and OAS begins at age {plan.retirementGoals?.oasStartAge}.</p>
              </div>
              <CircularInfo label="Success" value={`${plan.simulationResults?.successRate}%`} color={getSuccessColor(plan?.simulationResults?.successRate)} />
              <CircularInfo label="Legacy" value={`$${formatNetEstateValue(plan.calculatedState?.netEstateValue)}`} color={getLegacyColor(plan.calculatedState?.netEstateValue, plan.calculatedState?.openingBalanceRRSP + plan.calculatedState?.openingBalanceTFSA + plan.calculatedState?.openingBalanceNonRegisteredInvestments)} />
            </div>
            <div className="app__dashboard__plans__plan__item">
              <IncomeProjectionsBarChart planId={plan.planId}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
