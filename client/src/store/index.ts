import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import registerReducer from "../features/registerSlice";
import { moviesApi } from "../services/moviesApi";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
