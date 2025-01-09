import { Assumptions } from '../../types';
import { ActionTypes, UPDATE_ASSUMPTIONS } from '../types';

const initialState: Assumptions = {
  inflationRate: 2,
  investmentGrowthRate: 5,
  standardDeviation: 5,
  // simulationData: "Use S&P 500 Historical data",
};

const assumptionsReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_ASSUMPTIONS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default assumptionsReducer;