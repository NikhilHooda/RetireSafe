import { UIState } from '../../types';
import {
  SET_SELECTED_SECTION,
  SET_SELECTED_PLAN,
  TOGGLE_LEFT_MENU,
  ActionTypes
} from '../types';

// pass a call back function to the overlayClickHandler
  const overlayClickHandler = (e: React.MouseEvent<HTMLDivElement>, callBack: ()=> void) => {
    if (e.target === e.currentTarget) {
      callBack();
    }
  };



const initialState: UIState = {
  selectedSection: 'dashboard',
  selectedPlan: 'plan1',
  isLeftMenuOpen: true,
  overlayClickHandler,
};

const uiReducer = (state = initialState, action: ActionTypes): UIState => {
  switch (action.type) {
    case SET_SELECTED_SECTION:
      return {
        ...state,
        selectedSection: action.payload,
        // selectedPlan: '',
      };
    case SET_SELECTED_PLAN:
      return {
        ...state,
        selectedPlan: action.payload,
        // selectedSection: '',
      };
    case TOGGLE_LEFT_MENU:
      return {
        ...state,
        isLeftMenuOpen: !state.isLeftMenuOpen,
      };
    default:
      return state;
  }
};

export default uiReducer;
