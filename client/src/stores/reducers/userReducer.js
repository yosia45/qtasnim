import { ADD_USERS, LOGIN_USERS } from "../actions/actionType";

const initialState = {
  users: [],
  isLogin: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USERS:
      return { ...state, users: [...state.users, action.payload] };
    case LOGIN_USERS:
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
}

export default userReducer;
