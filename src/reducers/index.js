import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import itemsReducer from "./itemsReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  items: itemsReducer,
  cart: cartReducer,
  loadingBar: loadingBarReducer
});
