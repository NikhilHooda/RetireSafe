import {
  UPDATE_PERSONAL_INFO,
  UPDATE_ASSUMPTIONS,
  UPDATE_CURRENT_INVESTMENTS,
  UPDATE_FUTURE_INVESTMENTS,
  UPDATE_RETIREMENT_INCOME,
  SET_SELECTED_SECTION,
  SET_SELECTED_PLAN,
  TOGGLE_LEFT_MENU,
  UPDATE_RETIREMENT_GOALS,
  UPDATE_PLAN_RETIREMENT_GOALS,
  UPDATE_CALCULATED_STATE,
  UPDATE_PLAN_CALCULATED_STATE,
  UPDATE_SIMULATION_RESULTS,
  UPDATE_PLAN_SIMULATION_RESULTS,
  UPDATE_SIMULATION_METHOD,
  UPDATE_PLAN_SIMULATION_METHOD,
  UPDATE_PLAN_NAME_DESCRIPTION,
  ADD_NEW_RETIREMENT_PLAN,
  DELETE_RETIREMENT_PLAN,
} from "../types";

import {
  PersonalInfo,
  Assumptions,
  CurrentInvestments,
  FutureInvestments,
  RetirementIncome,
  RetirementGoals,
  CalculatedState,
  SimulationResults,
  RetirementPlan
} from "../../types";

export const updatePersonalInfo = (personalInfo: PersonalInfo) => ({
  type: UPDATE_PERSONAL_INFO,
  payload: personalInfo,
});

export const updateAssumptions = (assumptions: Assumptions) => ({
  type: UPDATE_ASSUMPTIONS,
  payload: assumptions,
});

export const updateCurrentInvestments = (
  currentInvestments: CurrentInvestments
) => ({
  type: UPDATE_CURRENT_INVESTMENTS,
  payload: currentInvestments,
});

export const updateFutureInvestments = (
  futureInvestments: FutureInvestments
) => ({
  type: UPDATE_FUTURE_INVESTMENTS,
  payload: futureInvestments,
});

export const updateRetirementIncome = (retirementIncome: RetirementIncome) => ({
  type: UPDATE_RETIREMENT_INCOME,
  payload: retirementIncome,
});

// export const updateRetirementGoals = (retirementGoals: RetirementGoals) => ({
//   type: UPDATE_RETIREMENT_GOALS,
//   payload: retirementGoals,
// });

export const updatePlanRetirementGoals = (planId: string, retirementGoals: RetirementGoals) => ({
  type: UPDATE_PLAN_RETIREMENT_GOALS,
  payload: { planId, retirementGoals },
});

// export const updateCalculatedState = (calculatedState: CalculatedState) => ({
//   type: UPDATE_CALCULATED_STATE,
//   payload: calculatedState,
// });

export const updatePlanCalculatedState = (planId: string, calculatedState: CalculatedState) => ({
  type: UPDATE_PLAN_CALCULATED_STATE,
  payload: { planId, calculatedState },
});

// export const updateSimulationResults = (simulationResults: SimulationResults) => ({
//   type: UPDATE_SIMULATION_RESULTS,
//   payload: simulationResults,
// });

export const updatePlanSimulationResults = (planId: string, simulationResults: SimulationResults) => ({
  type: UPDATE_PLAN_SIMULATION_RESULTS,
  payload: { planId, simulationResults },
});

// export const updateSimulationMethod = (simulationMethod: string) => {
//   return {
//     type: UPDATE_SIMULATION_METHOD,
//     payload: simulationMethod,
//   };
// };

export const updatePlanSimulationMethod = (planId: string, simulationMethod: string) => {
  return {
    type: UPDATE_PLAN_SIMULATION_METHOD,
    payload: { planId, simulationMethod },
  };
};

export const updatePlanNameDescription = (planId: string, planName: string, planDescription: string) => {
  return {
    type: UPDATE_PLAN_NAME_DESCRIPTION,
    payload: { planId, planName, planDescription },
  };
};

export const addNewRetirementPlan = (plan: RetirementPlan) => ({
  type: ADD_NEW_RETIREMENT_PLAN,
  payload: plan,
});

export const deleteRetirementPlan = (planId: string) => ({
  type: DELETE_RETIREMENT_PLAN,
  payload: planId,
});

export const setSelectedSection = (section: string) => ({
  type: SET_SELECTED_SECTION,
  payload: section,
});

export const setSelectedPlan = (plan: string) => ({
  type: SET_SELECTED_PLAN,
  payload: plan,
});

export const toggleLeftMenu = () => ({
  type: TOGGLE_LEFT_MENU,
});
