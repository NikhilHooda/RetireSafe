import { CurrentInvestments } from '../../types';
import { ActionTypes, UPDATE_CURRENT_INVESTMENTS } from '../types';

const initialState: CurrentInvestments = {
  rrsp: 0, // 200000,
  tfsa: 0, // 100000,
  nonRegisteredInvestments: 0,
  spouseRrsp: 0, // 90000,
  spouseTfsa: 0, // 100000,
  spouseNonRegisteredInvestments: 0
};

const currentInvestmentsReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_CURRENT_INVESTMENTS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default currentInvestmentsReducer;