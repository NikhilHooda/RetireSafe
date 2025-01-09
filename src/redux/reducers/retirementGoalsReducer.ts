import { RetirementGoals } from '../../types';
import { ActionTypes, UPDATE_RETIREMENT_GOALS } from '../types';

const initialState: RetirementGoals = {
  retirementStartingAge: 0, // 65,
  retirementEndingAge: 0, // 90,
  desiredRetirementIncome: 0, // 130000,
  cppStartAge: 60, // 70,
  oasStartAge: 65, // 70,
  withdrawalOrder: 'RRSP/Investment in equal proportion and then TFSA',
};

const retirementGoalsReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_RETIREMENT_GOALS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default retirementGoalsReducer;