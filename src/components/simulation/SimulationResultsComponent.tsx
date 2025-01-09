import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updatePlanSimulationMethod } from '../../redux/actions';
import { GlobalState, RetirementPlan } from '../../types';
import SimulationSP500Data from "./SimulationSP500Data";
import SimulationCustomSD from "./SimulationCustomSD";

const SimulationResultsComponent: React.FC = () => {
  const dispatch = useDispatch();
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);
  const selectedPlan = useSelector((state: GlobalState) => state.ui.selectedPlan);
  const currentPlan: RetirementPlan | undefined = retirementPlans.find(plan => plan.planId === selectedPlan);
  const [childTab, setChildTab] = useState<string>(currentPlan ? currentPlan.simulationMethod : 'sp500HistoricalData'); // Default to 'sp500HistoricalData'

  useEffect(() => {
    dispatch(updatePlanSimulationMethod(selectedPlan, childTab));
  }, [childTab, dispatch]);

  const handleTabChange = (tab: string) => {
    setChildTab(tab);
    dispatch(updatePlanSimulationMethod(selectedPlan, tab)); // Ensure the state is updated immediately
  };

  return (
    <>
      <div className="child-tabs">
        <button 
          className={childTab === 'sp500HistoricalData' ? 'active' : ''} 
          onClick={() => handleTabChange('sp500HistoricalData')}
        >
          S&P 500 Historical data
        </button>
        <button 
          className={childTab === 'customStandardDeviation' ? 'active' : ''} 
          onClick={() => handleTabChange('customStandardDeviation')}
        >
          Custom Standard Deviation
        </button>
      </div>
      <div className="child-tabs__content">
        {childTab === 'sp500HistoricalData' && (
          <SimulationSP500Data simulationMethod="sp500HistoricalData"/>
        )}
        {childTab === 'customStandardDeviation' && (
          <SimulationCustomSD simulationMethod="customStandardDeviation"/>
        )}
      </div>
    </>
  );
};

export default SimulationResultsComponent;
