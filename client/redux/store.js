import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

// project imports
import { rootPersistConfig, rootReducer } from "./reducer";

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

const { dispatch } = store;
const persister = persistStore(store);

const useDispatch = () => useAppDispatch();

const useSelector = useAppSelector;

export { store, dispatch, persister, useSelector, useDispatch };
