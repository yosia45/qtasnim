import {
  FETCH_DETAIL,
  ADD_ADDSTOCK_DETAIL,
  ADD_BUYSTOCK_DETAIL,
} from "../actions/actionType";

const initialState = {
  details: [],
};

function detailReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DETAIL:
      return { ...state, details: action.payload };
    case ADD_ADDSTOCK_DETAIL:
      return { ...state, details: [...state.details, action.payload] };
    case ADD_BUYSTOCK_DETAIL:
      return { ...state, details: [...state.details, action.payload] };
    default:
      return state
  }
}

export default detailReducer;
