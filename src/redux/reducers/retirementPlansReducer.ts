import { AnyAction } from 'redux';
import { CalculatedState, RetirementPlan } from '../../types';
import { ActionTypes, ADD_NEW_RETIREMENT_PLAN, UPDATE_PLAN_CALCULATED_STATE, UPDATE_PLAN_NAME_DESCRIPTION, UPDATE_PLAN_RETIREMENT_GOALS, UPDATE_PLAN_SIMULATION_METHOD, UPDATE_PLAN_SIMULATION_RESULTS, DELETE_RETIREMENT_PLAN } from '../types';

const initialState: RetirementPlan[] = [
    {
        planName: 'Base Plan',
        planId: 'plan1',
        planDescription: 'This is the base plan',
        simulationMethod: 'sp500HistoricalData',
        retirementGoals: {
            retirementStartingAge: 0, // 65,
            retirementEndingAge: 0, // 90,
            desiredRetirementIncome: 0, // 130000,
            cppStartAge: 60, // 70,
            oasStartAge: 65, // 70,
            withdrawalOrder: 'RRSP/Investment in equal proportion and then TFSA',
        },
        calculatedState: {
            cppValues: [],
            oasValues: [],
            otherIncomeValues: [],
            desiredIncomeValues: [],
            investmentAmountNeeded: [],
            openingBalanceRRSP: 0,
            openingBalanceTFSA: 0,
            openingBalanceNonRegisteredInvestments: 0,
            rrspWithdrawals: [],
            rrspBalances: [],
            tfsaWithdrawals: [],
            tfsaBalances: [],
            nonRegisteredInvestmentWithdrawals: [],
            nonRegisteredInvestmentBalances: [],
            shortfallAmounts: [],
            shortfallYears: 0,
            netEstateValue: 0,
            netWorths: [],
        },
        simulationResults: {
            meanReturn: 0,
            standardDeviation: 0,
            successCount: 0,
            successRate: 0,
            // simulationMethod: 'sp500HistoricalData',
            simulatedEndingPortfolio: 0,
            growthRates: [],
        },
    }
];

const retirementPlansReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case UPDATE_PLAN_CALCULATED_STATE:
            return state.map(plan =>
                plan.planId === action.payload.planId
                    ? { ...plan, calculatedState: action.payload.calculatedState }
                    : plan
            );
        case UPDATE_PLAN_RETIREMENT_GOALS:
            return state.map(plan =>
                plan.planId === action.payload.planId
                    ? { ...plan, retirementGoals: action.payload.retirementGoals }
                    : plan
            );
        case UPDATE_PLAN_SIMULATION_RESULTS:
            return state.map(plan =>
                plan.planId === action.payload.planId
                    ? { ...plan, simulationResults: action.payload.simulationResults }
                    : plan
            );
        case UPDATE_PLAN_SIMULATION_METHOD:
            return state.map(plan =>
                plan.planId === action.payload.planId
                    ? { ...plan, simulationMethod: action.payload.simulationMethod }
                    : plan
            );
        case UPDATE_PLAN_NAME_DESCRIPTION:
            return state.map(plan =>
                plan.planId === action.payload.planId
                    ? { ...plan, planName: action.payload.planName, planDescription: action.payload.planDescription }
                    : plan
            );
        case ADD_NEW_RETIREMENT_PLAN:
            return [...state, action.payload];
        case DELETE_RETIREMENT_PLAN:
            return state.filter(plan => plan.planId !== action.payload);
        default:
            return state;
    }
}

export default retirementPlansReducer;