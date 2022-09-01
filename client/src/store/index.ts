import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from "redux";

import reducers from "./reducers";

// const composeEnhancers =
//   (typeof window !== "undefined" &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export * from "./action-creators/register";
export * from "./action-creators/movie";
export * from "./action-creators/login";

export default store;
