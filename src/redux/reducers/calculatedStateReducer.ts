import { CalculatedState } from '../../types';
import { ActionTypes, UPDATE_CALCULATED_STATE } from '../types';

const initialState: CalculatedState = {
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
}

const calculatedStateReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case UPDATE_CALCULATED_STATE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default calculatedStateReducer;