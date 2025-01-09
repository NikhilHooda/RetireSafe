import { PersonalInfo, CurrentInvestments, FutureInvestments, RetirementIncome, RetirementGoals, CalculatedState, SimulationResults, RetirementPlan } from '../types';

export const UPDATE_PERSONAL_INFO = 'UPDATE_PERSONAL_INFO';
export const UPDATE_ASSUMPTIONS = 'UPDATE_ASSUMPTIONS';
export const UPDATE_CURRENT_INVESTMENTS = 'UPDATE_CURRENT_INVESTMENTS';
export const UPDATE_FUTURE_INVESTMENTS = 'UPDATE_FUTURE_INVESTMENTS';
export const UPDATE_RETIREMENT_INCOME = 'UPDATE_RETIREMENT_INCOME';
export const UPDATE_RETIREMENT_GOALS = 'UPDATE_RETIREMENT_GOALS';
export const UPDATE_PLAN_RETIREMENT_GOALS = 'UPDATE_PLAN_RETIREMENT_GOALS';
export const UPDATE_CALCULATED_STATE = 'UPDATE_CALCULATED_STATE';
export const UPDATE_PLAN_CALCULATED_STATE = 'UPDATE_PLAN_CALCULATED_STATE';
export const SET_SELECTED_SECTION = 'SET_SELECTED_SECTION';
export const SET_SELECTED_PLAN = 'SET_SELECTED_PLAN';
export const SET_SELECTED_PLAN_SECTION = 'SET_SELECTED_PLAN_SECTION';
export const TOGGLE_LEFT_MENU = 'TOGGLE_LEFT_MENU';
export const UPDATE_SIMULATION_RESULTS = 'UPDATE_PLAN_SIMULATION_RESULTS';
export const UPDATE_PLAN_SIMULATION_RESULTS = 'UPDATE_SIMULATION_RESULTS';
export const UPDATE_SIMULATION_METHOD = 'UPDATE_SIMULATION_METHOD';
export const UPDATE_PLAN_SIMULATION_METHOD = 'UPDATE_PLAN_SIMULATION_METHOD';
export const UPDATE_PLAN_NAME_DESCRIPTION = 'UPDATE_PLAN_NAME_DESCRIPTION';
export const ADD_NEW_RETIREMENT_PLAN = 'ADD_NEW_RETIREMENT_PLAN';
export const DELETE_RETIREMENT_PLAN = 'DELETE_RETIREMENT_PLAN';

interface UpdatePersonalInfoAction {
    type: typeof UPDATE_PERSONAL_INFO;
    payload: PersonalInfo;
}

interface UpdateAssumptionsAction {
    type: typeof UPDATE_ASSUMPTIONS;
    payload: PersonalInfo;
}

interface UpdateCurrentInvestmentsAction {
    type: typeof UPDATE_CURRENT_INVESTMENTS;
    payload: CurrentInvestments;
}

interface UpdateFutureInvestmentsAction {
    type: typeof UPDATE_FUTURE_INVESTMENTS;
    payload: FutureInvestments;
}

interface UpdateRetirementIncomeAction {
    type: typeof UPDATE_RETIREMENT_INCOME;
    payload: RetirementIncome;
}

interface UpdateRetirementGoalsAction {
    type: typeof UPDATE_RETIREMENT_GOALS;
    payload: RetirementGoals;
}

interface UpdatePlanRetirementGoalsAction {
    type: typeof UPDATE_PLAN_RETIREMENT_GOALS;
    payload: { planId: string; retirementGoals: RetirementGoals };
}

interface SetSelectedSectionAction {
    type: typeof SET_SELECTED_SECTION;
    payload: string;
}

interface SetSelectedPlanAction {
    type: typeof SET_SELECTED_PLAN;
    payload: string;
}

interface ToggleLeftMenuAction {
    type: typeof TOGGLE_LEFT_MENU;
    isLeftMenuOpen: boolean;
}

interface UpdateSimulationResultsAction {
    type: typeof UPDATE_SIMULATION_RESULTS;
    payload: SimulationResults;
}

interface UpdatePlanSimulationResultsAction {
    type: typeof UPDATE_PLAN_SIMULATION_RESULTS;
    payload: { planId: string; simulationResults: SimulationResults };
}

interface UpdateSimulationMethodAction {
    type: typeof UPDATE_SIMULATION_METHOD;
    payload: string;
}

interface UpdatePlanSimulationMethodAction {
    type: typeof UPDATE_PLAN_SIMULATION_METHOD;
    payload: { planId: string; simulationMethod: string };    
}
interface UpdateCalculatedStateAction {
    type: typeof UPDATE_CALCULATED_STATE;
    payload: CalculatedState;
}

interface UpdatePlanCalculatedStateAction {
    type: typeof UPDATE_PLAN_CALCULATED_STATE;
    payload: { planId: string; calculatedState: CalculatedState };
}

interface UpdatePlanNameDescriptionAction {
    type: typeof UPDATE_PLAN_NAME_DESCRIPTION;
    payload: { planId: string; planName: string, planDescription: string };
}

interface AddNewRetirementPlanAction {
    type: typeof ADD_NEW_RETIREMENT_PLAN;
    payload: RetirementPlan;
}

interface DeleteRetirementPlanAction {
    type: typeof DELETE_RETIREMENT_PLAN;
    payload: string;
}

export type ActionTypes =
    | UpdatePersonalInfoAction
    | UpdateAssumptionsAction
    | UpdateCurrentInvestmentsAction
    | UpdateFutureInvestmentsAction
    | UpdateRetirementIncomeAction
    | UpdateRetirementGoalsAction
    | UpdatePlanRetirementGoalsAction
    | UpdateCalculatedStateAction
    | UpdatePlanCalculatedStateAction
    | SetSelectedSectionAction
    | SetSelectedPlanAction
    | ToggleLeftMenuAction
    | UpdateSimulationResultsAction
    | UpdatePlanSimulationResultsAction
    | UpdateSimulationMethodAction
    | UpdatePlanSimulationMethodAction
    | UpdatePlanNameDescriptionAction
    | AddNewRetirementPlanAction
    | DeleteRetirementPlanAction;