import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  compose,
} from "redux";
import { counterReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";
import { userRegisterLoginReducer } from "./reducers/userReducers";

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  cart: counterReducer,
  userRegisterLogin: userRegisterLoginReducer,
});

const middleware = [thunk];

const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

const INITIAL_STATE = {
  cart: { value: 0 },
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
};

const store = legacy_createStore(
  reducer,
  INITIAL_STATE,
  createComposer(applyMiddleware(...middleware))
);

export default store;
