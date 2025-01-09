import { PersonalInfo } from '../../types';
import { ActionTypes, UPDATE_PERSONAL_INFO } from '../types';

const initialState: PersonalInfo = {
  name: '', // 'Davinder',
  currentAge: 0, // 54,
  spouseName: '', // 'Raj',
  spouseCurrentAge: 0, // 53
};

const personalInfoReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_PERSONAL_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default personalInfoReducer;