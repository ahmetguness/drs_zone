import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Race } from "../../../types/models/StandingModels/CurrentYear";

interface RaceState {
  currentYearRaces: Race[];
}

const initialState: RaceState = {
  currentYearRaces: [],
};

const raceSlice = createSlice({
  name: "race",
  initialState,
  reducers: {
    setCurrentYearRaces(state, action: PayloadAction<Race[]>) {
      state.currentYearRaces = action.payload;
    },
  },
});

export const { setCurrentYearRaces } = raceSlice.actions;
export default raceSlice.reducer;
