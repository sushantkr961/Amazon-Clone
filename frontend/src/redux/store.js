import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  compose,
} from "redux";
import { counterReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({ cart: counterReducer });

const middleware = [thunk];
const store = legacy_createStore(
  reducer,
  { cart: { value: 0 } },
  createComposer(applyMiddleware(...middleware))
);

export default store;
