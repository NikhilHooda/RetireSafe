import React from 'react';
import { useSelector } from 'react-redux';
import { GlobalState, RetirementPlan, SimulationResults } from '../../types';
import SuccessRatePieChart from './SuccessRatePieChart';
import GrowthRateDistributionsChart from './GrowthRateDistributionsChart';
import { formatNetEstateValue } from '../../utils/formatters';

interface SimulationSP500DataProps {
  simulationMethod: string;
}

const SimulationSP500Data: React.FC<SimulationSP500DataProps> = ({ simulationMethod }) => {
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);
  const selectedPlan = useSelector((state: GlobalState) => state.ui.selectedPlan);
  const currentPlan: RetirementPlan | undefined = retirementPlans.find(plan => plan.planId === selectedPlan);
  const simulationResults = currentPlan ? currentPlan.simulationResults : {} as SimulationResults;

  // const simulationResults = useSelector((state: GlobalState) => state.simulationResults);
  const noOfTrials = 1000;

  return (
    <div className="sp500-data-simulation success-rate__content">
      <p className="success-rate__desc">This simulation uses historical data from the S&P 500 to estimate the success rate of your retirement plan.</p>
      <div className="success-rate__info">
        <p className="success-rate__info__text">Mean growth rate: {simulationResults.meanReturn}%</p>
        <p className="success-rate__info__text"> Standard deviation: {simulationResults.standardDeviation}%</p>
        <p className="success-rate__info__text">Number of trials: {noOfTrials}</p>
        <p className="success-rate__info__text">Success count: {simulationResults.successCount}</p>
        <p className="success-rate__info__text">Simulated ending portfolio: ${formatNetEstateValue(simulationResults.simulatedEndingPortfolio)}</p>
      </div>
      <div className="success-rate__charts">
        <SuccessRatePieChart noOfTrials={noOfTrials} />
        <div className="success-rate__growth-rates-distribution">
          {/* <HighchartsReact highcharts={Highcharts} options={successCountOptions} /> */}
          <GrowthRateDistributionsChart noOfTrials={noOfTrials} />
        </div>
      </div>
    </div>
  );
};

export default SimulationSP500Data;
