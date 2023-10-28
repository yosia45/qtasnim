import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import typeReducer from "./typeReducer";
import detailReducer from "./detailReducer";

const rootReducer = combineReducers({
  item: itemReducer,
  type: typeReducer,
  detail: detailReducer,
});

export default rootReducer;
