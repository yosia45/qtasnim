import {
  FETCH_ITEM,
  FETCH_ITEM_BY_ID,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
} from "../actions/actionType";

const initialState = {
  items: [],
  itemById: {},
  editItem: [],
  deleteItem: [],
};

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEM:
      return { ...state, items: action.payload };
    case FETCH_ITEM_BY_ID:
      return { ...state, itemById: action.payload };
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case EDIT_ITEM:
      return { ...state, editItem: action.payload };
    case DELETE_ITEM:
      return { ...state, deleteItem: action.payload };
    default:
      return state;
  }
}

export default itemReducer;
