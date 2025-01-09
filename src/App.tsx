// import express, { Request, Response } from 'express';
// import session from 'express-session';
// import bcrypt from 'bcryptjs';
// import mysql from 'mysql2/promise';
// import bodyParser from 'body-parser';
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from 'react-redux';
import Dashboard from './components/Dashboard';
import CurrentInvestmentsForm from './components/forms/CurrentInvestmentsForm';
import RetirementIncomeForm from './components/forms/RetirementIncomeForm';
import Plan from './components/Plan';
import { updatePlanCalculatedState, updatePlanSimulationResults } from "./redux/actions";
import { GlobalState, RetirementPlan } from './types';
import store from './redux/store';
import LeftMenu from './components/LeftMenu';
import TopSection from './components/TopSection';
import ResultsSection from './components/ResultsSection';
import './App.scss';
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
} from "./utils/calculations";
import { runRetirementSimulation } from "./utils/simulation";
import FutureInvestmentsForm from "./components/forms/FutureInvestmentsForm";
import AssumptionsForm from "./components/forms/AssumptionsForm";



const App = () => {
  const dispatch = useDispatch();
  const { currentAge } = useSelector((state: GlobalState) => state.personalInfo);
  const { rrsp, spouseRrsp, tfsa, spouseTfsa, nonRegisteredInvestments, spouseNonRegisteredInvestments } = useSelector((state: GlobalState) => state.currentInvestments);
  const { cpp, spouseCpp, oas, spouseOas, pension, spousePension, otherRetirementIncome } = useSelector((state: GlobalState) => state.retirementIncome);
  const { futureAnnualRrsp, spouseFutureAnnualRrsp, futureAnnualTfsa, spouseFutureAnnualTfsa, futureAnnualNonRegisteredInvestments, spouseFutureAnnualNonRegisteredInvestments } = useSelector((state: GlobalState) => state.futureInvestments);
  const { selectedSection, selectedPlan } = useSelector((state: GlobalState) => state.ui);
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);
  const currentPlan: RetirementPlan | undefined = retirementPlans.find(plan => plan.planId === selectedPlan);
  const cppStartAge = currentPlan?.retirementGoals.cppStartAge ?? 65;
  const oasStartAge = currentPlan?.retirementGoals.oasStartAge ?? 65;
  const retirementStartingAge = currentPlan?.retirementGoals.retirementStartingAge ?? 65;
  const retirementEndingAge = currentPlan?.retirementGoals.retirementEndingAge ?? 90;
  const desiredRetirementIncome = currentPlan?.retirementGoals.desiredRetirementIncome ?? 50000;
  const withdrawalOrder = currentPlan?.retirementGoals.withdrawalOrder || 'RRSP/Investment in equal proportion and then TFSA';
  
  const { inflationRate, investmentGrowthRate, standardDeviation } = useSelector((state: GlobalState) => state.assumptions);
  const simulationMethod = currentPlan?.simulationMethod ?? 'sp500HistoricalData';

  const { isLeftMenuOpen } = useSelector((state: GlobalState) => state.ui);

  useEffect(() => {
    retirementPlans.forEach((plan) => {
      const retirementStartingAge = plan.retirementGoals.retirementStartingAge;
      const retirementEndingAge = plan.retirementGoals.retirementEndingAge;
      const desiredRetirementIncome = plan.retirementGoals.desiredRetirementIncome;
      const cppStartAge = plan.retirementGoals.cppStartAge;
      const oasStartAge = plan.retirementGoals.oasStartAge;
      const withdrawalOrder = plan.retirementGoals.withdrawalOrder;
      const planId = plan.planId;

      const cppValues = calculateCPP({
        cppStartAge,
        cppAmount: cpp,
        retirementStartingAge,
        retirementEndingAge,
        inflationRate,
        spouseCPP: spouseCpp,
      });

      const oasValues = calculateOAS({
        oasStartAge,
        oasAmount: oas,
        spouseOAS: spouseOas,
        retirementStartingAge,
        retirementEndingAge,
        inflationRate,
      });

      const otherIncomeValues = calculateOtherIncomes({
        pension,
        spousePension,
        otherRetirementIncome,
        retirementStartingAge,
        retirementEndingAge,
      });

      const desiredIncomeValues = calculateDesiredIncomes({
        desiredRetirementIncome,
        retirementStartingAge,
        retirementEndingAge,
        inflationRate,
      });

      const investmentAmountNeeded = calculateInvestmentAmountNeeded({
        cppValues,
        oasValues,
        otherIncomeValues,
        desiredIncomeValues,
      });

      const openingBalanceRRSP = calculateOpeningBalanceRRSP({
        currentAmount: rrsp,
        spouseAmount: spouseRrsp,
        futureAmount: futureAnnualRrsp,
        spouseFutureAmount: spouseFutureAnnualRrsp,
        investmentGrowthRate,
        currentAge,
        retirementStartingAge,
      });

      const openingBalanceTFSA = calculateOpeningBalanceTFSA({
        currentAmount: tfsa,
        spouseAmount: spouseTfsa,
        futureAmount: futureAnnualTfsa,
        spouseFutureAmount: spouseFutureAnnualTfsa,
        investmentGrowthRate,
        currentAge,
        retirementStartingAge,
      });

      const openingBalanceNonRegisteredInvestments =
        calculateOpeningBalanceNonRegisteredInvestments({
          currentAmount: nonRegisteredInvestments,
          spouseAmount: spouseNonRegisteredInvestments,
          futureAmount: futureAnnualNonRegisteredInvestments,
          spouseFutureAmount: spouseFutureAnnualNonRegisteredInvestments,
          investmentGrowthRate,
          currentAge,
          retirementStartingAge,
        });

      const withdrawalsAndGrowth = calculateWithdrawalsAndGrowth({
        investmentAmountNeeded,
        openingBalanceRRSP,
        openingBalanceTFSA,
        openingBalanceNonRegisteredInvestments,
        investmentGrowthRate,
        withdrawalOrder,
        retirementStartingAge,
        retirementEndingAge,
        inflationRate,
      });

      const netEstateValue = calculateNetEstateValue(withdrawalsAndGrowth.rrspBalances, withdrawalsAndGrowth.tfsaBalances, withdrawalsAndGrowth.nonRegisteredInvestmentBalances, retirementEndingAge);

      // Data for the simulation to calculate the success rate
      const startingInvestments = tfsa + spouseTfsa + rrsp + spouseRrsp + nonRegisteredInvestments + spouseNonRegisteredInvestments;
      const futureAnnualContribution = futureAnnualRrsp + futureAnnualTfsa + futureAnnualNonRegisteredInvestments + spouseFutureAnnualRrsp + spouseFutureAnnualTfsa + spouseFutureAnnualNonRegisteredInvestments; 
      const workingYears = retirementStartingAge - currentAge;
      const retirementYears = retirementEndingAge - retirementStartingAge;
      const requiredRetirementIncome = investmentAmountNeeded[retirementStartingAge];

      const simulatedRetirementResults = async () => {
        const simulationData = await runRetirementSimulation({
          startingInvestments,
          futureAnnualContribution,
          requiredRetirementIncome,
          workingYears,
          retirementYears,
          inflationRate: inflationRate / 100, // Convert to decimal
          simulations: 1000, // Number of simulations
          simulationMethod,
          standardDeviation, // Should be passed as % value, without dividing by 100
          investmentGrowthRate, // Should be passed as % value, without dividing by 100
        });

        // console.log("simulationResults: ", simulationResults);

        dispatch(updatePlanSimulationResults(planId,{
          meanReturn: simulationData.meanReturn,
          standardDeviation: simulationData.standardDeviation,
          successRate: simulationData.successRate,
          simulatedEndingPortfolio: simulationData.simulatedEndingPortfolio,
          successCount: simulationData.successCount,
          growthRates: simulationData.growthRates,
        }));

        dispatch(updatePlanCalculatedState(planId, {
          cppValues,
          oasValues,
          otherIncomeValues,
          desiredIncomeValues,
          investmentAmountNeeded,
          openingBalanceRRSP,
          openingBalanceTFSA,
          openingBalanceNonRegisteredInvestments,
          ...withdrawalsAndGrowth,
          netEstateValue
        }));
      };
      // console.log("retirementPlans: ", retirementPlans);
      // console.log("planId: ", planId);

      simulatedRetirementResults();
    });

  }, [
    currentAge,
    inflationRate, // Assumptions
    investmentGrowthRate,
    standardDeviation,
    rrsp, // Current investments
    spouseRrsp,
    tfsa,
    spouseTfsa,
    nonRegisteredInvestments,
    spouseNonRegisteredInvestments,
    futureAnnualRrsp, // Future investments
    spouseFutureAnnualRrsp,
    futureAnnualTfsa,
    spouseFutureAnnualTfsa,
    futureAnnualNonRegisteredInvestments,
    spouseFutureAnnualNonRegisteredInvestments,
    cpp, // Retirement income
    spouseCpp,
    oas,
    spouseOas,
    pension,
    spousePension,
    otherRetirementIncome,
    dispatch
  ]);

  useEffect(() => {
    const cppValues = calculateCPP({
      cppStartAge,
      cppAmount: cpp,
      retirementStartingAge,
      retirementEndingAge,
      inflationRate,
      spouseCPP: spouseCpp,
    });

    const oasValues = calculateOAS({
      oasStartAge,
      oasAmount: oas,
      spouseOAS: spouseOas,
      retirementStartingAge,
      retirementEndingAge,
      inflationRate,
    });

    const otherIncomeValues = calculateOtherIncomes({
      pension,
      spousePension,
      otherRetirementIncome,
      retirementStartingAge,
      retirementEndingAge,
    });

    const desiredIncomeValues = calculateDesiredIncomes({
      desiredRetirementIncome,
      retirementStartingAge,
      retirementEndingAge,
      inflationRate,
    });

    const investmentAmountNeeded = calculateInvestmentAmountNeeded({
      cppValues,
      oasValues,
      otherIncomeValues,
      desiredIncomeValues,
    });

    const openingBalanceRRSP = calculateOpeningBalanceRRSP({
      currentAmount: rrsp,
      spouseAmount: spouseRrsp,
      futureAmount: futureAnnualRrsp,
      spouseFutureAmount: spouseFutureAnnualRrsp,
      investmentGrowthRate,
      currentAge,
      retirementStartingAge,
    });

    const openingBalanceTFSA = calculateOpeningBalanceTFSA({
      currentAmount: tfsa,
      spouseAmount: spouseTfsa,
      futureAmount: futureAnnualTfsa,
      spouseFutureAmount: spouseFutureAnnualTfsa,
      investmentGrowthRate,
      currentAge,
      retirementStartingAge,
    });

    const openingBalanceNonRegisteredInvestments =
      calculateOpeningBalanceNonRegisteredInvestments({
        currentAmount: nonRegisteredInvestments,
        spouseAmount: spouseNonRegisteredInvestments,
        futureAmount: futureAnnualNonRegisteredInvestments,
        spouseFutureAmount: spouseFutureAnnualNonRegisteredInvestments,
        investmentGrowthRate,
        currentAge,
        retirementStartingAge,
      });

    const withdrawalsAndGrowth = calculateWithdrawalsAndGrowth({
      investmentAmountNeeded,
      openingBalanceRRSP,
      openingBalanceTFSA,
      openingBalanceNonRegisteredInvestments,
      investmentGrowthRate,
      withdrawalOrder,
      retirementStartingAge,
      retirementEndingAge,
      inflationRate,
    });

    const netEstateValue = calculateNetEstateValue(withdrawalsAndGrowth.rrspBalances, withdrawalsAndGrowth.tfsaBalances, withdrawalsAndGrowth.nonRegisteredInvestmentBalances, retirementEndingAge);

    // Data for the simulation to calculate the success rate
    const startingInvestments = tfsa + spouseTfsa + rrsp + spouseRrsp + nonRegisteredInvestments + spouseNonRegisteredInvestments;
    const futureAnnualContribution = futureAnnualRrsp + futureAnnualTfsa + futureAnnualNonRegisteredInvestments + spouseFutureAnnualRrsp + spouseFutureAnnualTfsa + spouseFutureAnnualNonRegisteredInvestments; 
    const workingYears = retirementStartingAge - currentAge;
    const retirementYears = retirementEndingAge - retirementStartingAge;
    const requiredRetirementIncome = investmentAmountNeeded[retirementStartingAge];

    const simulatedRetirementResults = async () => {
      const simulationData = await runRetirementSimulation({
        startingInvestments,
        futureAnnualContribution,
        requiredRetirementIncome,
        workingYears,
        retirementYears,
        inflationRate: inflationRate / 100, // Convert to decimal
        simulations: 1000, // Number of simulations
        simulationMethod,
        standardDeviation, // Should be passed as % value, without dividing by 100
        investmentGrowthRate, // Should be passed as % value, without dividing by 100
      });

      // console.log("simulationResults: ", simulationResults);

      dispatch(updatePlanSimulationResults(selectedPlan,{
        meanReturn: simulationData.meanReturn,
        standardDeviation: simulationData.standardDeviation,
        successRate: simulationData.successRate,
        simulatedEndingPortfolio: simulationData.simulatedEndingPortfolio,
        successCount: simulationData.successCount,
        growthRates: simulationData.growthRates,
      }));

      dispatch(updatePlanCalculatedState(selectedPlan, {
        cppValues,
        oasValues,
        otherIncomeValues,
        desiredIncomeValues,
        investmentAmountNeeded,
        openingBalanceRRSP,
        openingBalanceTFSA,
        openingBalanceNonRegisteredInvestments,
        ...withdrawalsAndGrowth,
        netEstateValue
      }));
    };
    // console.log("retirementPlans: ", retirementPlans);
    // console.log("selctedPlan: ", selectedPlan);

    simulatedRetirementResults();

  }, [
    simulationMethod,
    selectedPlan,
    retirementStartingAge,// retirement goals
    retirementEndingAge,
    desiredRetirementIncome,
    cppStartAge,
    oasStartAge,
    withdrawalOrder,
    dispatch
  ]);

  console.log('state', store.getState());

  return (
    <Provider store={store}>
      <div className="app">
        {isLeftMenuOpen && <LeftMenu />}
        <div className={`app__main-section ${isLeftMenuOpen ? 'left-menu-open' : ''}`}>
          <TopSection />
          <ResultsSection />
        </div>
      </div>
    </Provider>
  );
};
 
// const app = express();

// app.use()
export default App;