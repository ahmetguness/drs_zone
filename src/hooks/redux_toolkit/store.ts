import { configureStore } from "@reduxjs/toolkit";
import RaceSlice from "./Slices/RaceSlice";

const store = configureStore({
  reducer: {
    race: RaceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
