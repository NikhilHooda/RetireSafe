import { RetirementIncome } from '../../types';
import { ActionTypes, UPDATE_RETIREMENT_INCOME } from '../types';

const initialState: RetirementIncome = {
  cpp: 0, // 700,
  oas: 0, // 700,
  pension: 0, // 1300,
  spousePension: 0, // 400,
  spouseCpp: 0, // 400,
  spouseOas: 0, // 700,
  otherRetirementIncome: 0, // 1800,
};

const retirementIncomeReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_RETIREMENT_INCOME:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default retirementIncomeReducer;