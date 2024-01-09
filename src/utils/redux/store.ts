import { configureStore } from "@reduxjs/toolkit";
import habitsList from "./habitsList";

export const store = configureStore({
  reducer: {
    habitsList: habitsList,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
