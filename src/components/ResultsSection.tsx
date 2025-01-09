import React, { useEffect, useState } from "react";
import Dashboard from './Dashboard';
import CurrentInvestmentsForm from './forms/CurrentInvestmentsForm';
import RetirementIncomeForm from './forms/RetirementIncomeForm';
import Plan from './Plan';
import { useDispatch, useSelector } from 'react-redux';
// import { updateCalculatedState, updateSimulationResults } from "../redux/actions";
import { GlobalState } from '../types';
import {
  calculateCPP,
  calculateOAS,
  calculateOtherIncomes,
  calculateDesiredIncomes,
  calculateInvestmentAmountNeeded,
  calculateOpeningBalanceRRSP,
  calculateOpeningBalanceTFSA,
  calculateOpeningBalanceNonRegisteredInvestments,
  calculateWithdrawalsAndGrowth,
  calculateNetEstateValue
} from "../utils/calculations";
import { runRetirementSimulation } from "../utils/simulation";
import FutureInvestmentsForm from "./forms/FutureInvestmentsForm";
import AssumptionsForm from "./forms/AssumptionsForm";

const ResultsSection: React.FC = () => {
  const dispatch = useDispatch();
  const { currentAge } = useSelector((state: GlobalState) => state.personalInfo);
  const { rrsp, spouseRrsp, tfsa, spouseTfsa, nonRegisteredInvestments, spouseNonRegisteredInvestments } = useSelector((state: GlobalState) => state.currentInvestments);
  const { cpp, spouseCpp, oas, spouseOas, pension, spousePension, otherRetirementIncome } = useSelector((state: GlobalState) => state.retirementIncome);
  const { futureAnnualRrsp, spouseFutureAnnualRrsp, futureAnnualTfsa, spouseFutureAnnualTfsa, futureAnnualNonRegisteredInvestments, spouseFutureAnnualNonRegisteredInvestments } = useSelector((state: GlobalState) => state.futureInvestments);
  // const { cppStartAge, oasStartAge, retirementStartingAge, retirementEndingAge, desiredRetirementIncome, withdrawalOrder } = useSelector((state: GlobalState) => state.retirementGoals);
  // const { inflationRate, investmentGrowthRate, standardDeviation } = useSelector((state: GlobalState) => state.assumptions);
  const { selectedSection, selectedPlan } = useSelector((state: GlobalState) => state.ui);
  // const { simulationMethod } = useSelector((state: GlobalState) => state.simulationResults);

  // useEffect(() => {
  //   const cppValues = calculateCPP({
  //     cppStartAge,
  //     cppAmount: cpp,
  //     retirementStartingAge,
  //     retirementEndingAge,
  //     inflationRate,
  //     spouseCPP: spouseCpp,
  //   });

  //   const oasValues = calculateOAS({
  //     oasStartAge,
  //     oasAmount: oas,
  //     spouseOAS: spouseOas,
  //     retirementStartingAge,
  //     retirementEndingAge,
  //     inflationRate,
  //   });

  //   const otherIncomeValues = calculateOtherIncomes({
  //     pension,
  //     spousePension,
  //     otherRetirementIncome,
  //     retirementStartingAge,
  //     retirementEndingAge,
  //   });

  //   const desiredIncomeValues = calculateDesiredIncomes({
  //     desiredRetirementIncome,
  //     retirementStartingAge,
  //     retirementEndingAge,
  //     inflationRate,
  //   });

  //   const investmentAmountNeeded = calculateInvestmentAmountNeeded({
  //     cppValues,
  //     oasValues,
  //     otherIncomeValues,
  //     desiredIncomeValues,
  //   });

  //   const openingBalanceRRSP = calculateOpeningBalanceRRSP({
  //     currentAmount: rrsp,
  //     spouseAmount: spouseRrsp,
  //     futureAmount: futureAnnualRrsp,
  //     spouseFutureAmount: spouseFutureAnnualRrsp,
  //     investmentGrowthRate,
  //     currentAge,
  //     retirementStartingAge,
  //   });

  //   const openingBalanceTFSA = calculateOpeningBalanceTFSA({
  //     currentAmount: tfsa,
  //     spouseAmount: spouseTfsa,
  //     futureAmount: futureAnnualTfsa,
  //     spouseFutureAmount: spouseFutureAnnualTfsa,
  //     investmentGrowthRate,
  //     currentAge,
  //     retirementStartingAge,
  //   });

  //   const openingBalanceNonRegisteredInvestments =
  //     calculateOpeningBalanceNonRegisteredInvestments({
  //       currentAmount: nonRegisteredInvestments,
  //       spouseAmount: spouseNonRegisteredInvestments,
  //       futureAmount: futureAnnualNonRegisteredInvestments,
  //       spouseFutureAmount: spouseFutureAnnualNonRegisteredInvestments,
  //       investmentGrowthRate,
  //       currentAge,
  //       retirementStartingAge,
  //     });

  //   const withdrawalsAndGrowth = calculateWithdrawalsAndGrowth({
  //     investmentAmountNeeded,
  //     openingBalanceRRSP,
  //     openingBalanceTFSA,
  //     openingBalanceNonRegisteredInvestments,
  //     investmentGrowthRate,
  //     withdrawalOrder,
  //     retirementStartingAge,
  //     retirementEndingAge,
  //     inflationRate,
  //   });

  //   const netEstateValue = calculateNetEstateValue(withdrawalsAndGrowth.rrspBalances, withdrawalsAndGrowth.tfsaBalances, withdrawalsAndGrowth.nonRegisteredInvestmentBalances, retirementEndingAge);

  //   // Data for the simulation to calculate the success rate
  //   const startingInvestments = tfsa + spouseTfsa + rrsp + spouseRrsp + nonRegisteredInvestments + spouseNonRegisteredInvestments;
  //   const futureAnnualContribution = futureAnnualRrsp + futureAnnualTfsa + futureAnnualNonRegisteredInvestments + spouseFutureAnnualRrsp + spouseFutureAnnualTfsa + spouseFutureAnnualNonRegisteredInvestments; 
  //   const workingYears = retirementStartingAge - currentAge;
  //   const retirementYears = retirementEndingAge - retirementStartingAge;
  //   const requiredRetirementIncome = investmentAmountNeeded[retirementStartingAge];

  //   const simulatedRetirementResults = async () => {
  //     const simulationResults = await runRetirementSimulation({
  //       startingInvestments,
  //       futureAnnualContribution,
  //       requiredRetirementIncome,
  //       workingYears,
  //       retirementYears,
  //       inflationRate: inflationRate / 100, // Convert to decimal
  //       simulations: 1000, // Number of simulations
  //       simulationMethod,
  //       standardDeviation, // Should be passed as % value, without dividing by 100
  //       investmentGrowthRate, // Should be passed as % value, without dividing by 100
  //     });

  //     // console.log("simulationResults: ", simulationResults);

  //     dispatch(updateSimulationResults({
  //       meanReturn: simulationResults.meanReturn,
  //       standardDeviation: simulationResults.standardDeviation,
  //       successRate: simulationResults.successRate,
  //       simulatedEndingPortfolio: simulationResults.simulatedEndingPortfolio,
  //       successCount: simulationResults.successCount,
  //       simulationMethod: simulationResults.simulationMethod,
  //       growthRates: simulationResults.growthRates,
  //     }));

  //     dispatch(updateCalculatedState({
  //       cppValues,
  //       oasValues,
  //       otherIncomeValues,
  //       desiredIncomeValues,
  //       investmentAmountNeeded,
  //       openingBalanceRRSP,
  //       openingBalanceTFSA,
  //       openingBalanceNonRegisteredInvestments,
  //       ...withdrawalsAndGrowth,
  //       netEstateValue
  //     }));
  //   };

  //   simulatedRetirementResults();

  // }, [
  //   cpp,
  //   spouseCpp,
  //   oas,
  //   spouseOas,
  //   pension,
  //   spousePension,
  //   otherRetirementIncome,
  //   inflationRate,
  //   investmentGrowthRate,
  //   rrsp,
  //   spouseRrsp,
  //   tfsa,
  //   spouseTfsa,
  //   nonRegisteredInvestments,
  //   spouseNonRegisteredInvestments,
  //   currentAge,
  //   futureAnnualRrsp,
  //   spouseFutureAnnualRrsp,
  //   futureAnnualTfsa,
  //   spouseFutureAnnualTfsa,
  //   futureAnnualNonRegisteredInvestments,
  //   spouseFutureAnnualNonRegisteredInvestments,
  //   cppStartAge,
  //   oasStartAge,
  //   retirementStartingAge,
  //   retirementEndingAge,
  //   desiredRetirementIncome,
  //   withdrawalOrder,
  //   simulationMethod,
  //   standardDeviation,
  //   dispatch
  // ]);

  return (
    <div className="app__main-section__results-section">
      {selectedSection === 'dashboard' && <Dashboard />}
      {selectedSection === 'currentFinances' && <CurrentInvestmentsForm layout={"two-column"} showPieChart={true} />}
      {selectedSection === 'futureInvestments' && <FutureInvestmentsForm layout={"two-column"} showPieChart={true} />}
      {selectedSection === 'retirementIncome' && <RetirementIncomeForm layout={"two-column"} showPieChart={true} />}
      {selectedSection === 'assumptions' && <AssumptionsForm layout={"two-column"} />}
      {selectedSection === 'plan' && <Plan />}
    </div>
  );
};

export default ResultsSection;
