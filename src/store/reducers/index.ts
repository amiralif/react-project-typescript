import { combineReducers } from "redux";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { movieReducer } from "./movieReducer";

export default combineReducers({
  register: registerReducer,
  login: loginReducer,
  movies: movieReducer,
});
