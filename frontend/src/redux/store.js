import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from "./reducers/userReducers";

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  cart: cartReducer,
  userRegisterLogin: userRegisterLoginReducer,
});

const middleware = [thunk];

const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

const INITIAL_STATE = {
  cart: { cartItems: [], itemsCount: 0, cartSubtotal: 0 },
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
};

const store = legacy_createStore(
  reducer,
  INITIAL_STATE,
  createComposer(applyMiddleware(...middleware))
);

export default store;
