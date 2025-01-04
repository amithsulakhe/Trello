import { combineReducers } from "redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import signUpReducer from "./slices/sign-up-slice";

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const reducer = combineReducers({
  signUp: signUpReducer,
});

const initialState = reducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "LOG_OUT") {
    state = initialState;
  }

  return reducer(state, action);
};

export { rootReducer, rootPersistConfig };
