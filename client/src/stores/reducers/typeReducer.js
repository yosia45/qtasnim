import {
  FETCH_TYPE,
  FETCH_TYPE_BY_ID,
  ADD_TYPE,
  EDIT_TYPE,
  DELETE_TYPE,
} from "../actions/actionType";

const initialState = {
  types: [],
  typeById: {},
  updateType: [],
  deleteType: [],
};

function typeReducer(state = initialState, actions) {
  switch (actions.type) {
    case FETCH_TYPE:
      return { ...state, types: actions.payload };
    case FETCH_TYPE_BY_ID:
      return { ...state, typeById: actions.payload };
    case ADD_TYPE:
      return { ...state, types: [...state.types, actions.payload] };
    case EDIT_TYPE:
      return { ...state, updateType: actions.payload };
    case DELETE_TYPE:
      return { ...state, deleteType: actions.payload };
    default:
      return state;
  }
}

export default typeReducer;
