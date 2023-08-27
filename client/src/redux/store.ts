import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import todoReducer from "./reducers/todoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;