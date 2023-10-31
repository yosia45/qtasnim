import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import typeReducer from "./typeReducer";
import detailReducer from "./detailReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  item: itemReducer,
  type: typeReducer,
  detail: detailReducer,
  user: userReducer,
});

export default rootReducer;
