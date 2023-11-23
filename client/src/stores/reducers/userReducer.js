import { ADD_USERS, LOGIN_USERS, FORGOT_PASSWORD } from "../actions/actionType";

const initialState = {
  users: [],
  isLogin: false,
  resetToken: null,
  forgotPasswordData: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USERS:
      return { ...state, users: [...state.users, action.payload] };
    case LOGIN_USERS:
      return { ...state, isLogin: action.payload };
    case FORGOT_PASSWORD:
      return { ...state, forgotPasswordData: action.payload };
    default:
      return state;
  }
}

export default userReducer;
