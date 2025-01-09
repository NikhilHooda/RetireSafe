import { SimulationResults } from '../../types';
import { ActionTypes, UPDATE_SIMULATION_METHOD, UPDATE_SIMULATION_RESULTS } from '../types';

const initialState: SimulationResults = {
    meanReturn: 0,
    standardDeviation: 0,
    successCount: 0,
    successRate: 0,
    simulatedEndingPortfolio: 0,
    growthRates: [],
}

const simulationResultsReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case UPDATE_SIMULATION_RESULTS:
            return {
                ...state,
                ...action.payload,
            };
        case UPDATE_SIMULATION_METHOD:
            return {
                ...state,
                simulationMethod: action.payload,
            };
        default:
            return state;
    }
}

export default simulationResultsReducer;