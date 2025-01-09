import { combineReducers } from 'redux';
import personalInfoReducer from './personalInfoReducer';
import currentInvestmentsReducer from './currentInvestmentsReducer';
import futureInvestmentsReducer from './futureInvestmentsReducer';
import retirementIncomeReducer from './retirementIncomeReducer';
import assumptionsReducer from './assumptionsReducer';
import retirementGoalsReducer from './retirementGoalsReducer';
import calculatedStateReducer from './calculatedStateReducer';
import uiReducer from './uiReducer';
import simulationResultsReducer from './simulationResultsReducer';
import retirementPlansReducer from './retirementPlansReducer';

const rootReducer = combineReducers({
  personalInfo: personalInfoReducer,
  assumptions: assumptionsReducer,
  currentInvestments: currentInvestmentsReducer,
  futureInvestments: futureInvestmentsReducer,
  retirementIncome: retirementIncomeReducer,
  retirementGoals: retirementGoalsReducer,
  calculatedState: calculatedStateReducer,
  ui: uiReducer,
  simulationResults: simulationResultsReducer,
  retirementPlans: retirementPlansReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;