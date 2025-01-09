import { FutureInvestments } from '../../types';
import { ActionTypes, UPDATE_FUTURE_INVESTMENTS } from '../types';

const initialState: FutureInvestments = {
  futureAnnualRrsp: 0, // 10000,
  futureAnnualTfsa: 0, // 9000,
  futureAnnualNonRegisteredInvestments: 0,
  spouseFutureAnnualRrsp: 0,
  spouseFutureAnnualTfsa: 0, // 9000,
  spouseFutureAnnualNonRegisteredInvestments: 0
};

const futureInvestmentsReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_FUTURE_INVESTMENTS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default futureInvestmentsReducer;