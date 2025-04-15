import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Race } from "../../../types/models/StandingModels/CurrentYear";
import { set } from "date-fns";

interface RaceState {
  currentYearRaces: Race[];
  selectedRaceInfo: {
    year: string;
    round: string;
  };
}

const initialState: RaceState = {
  currentYearRaces: [],
  selectedRaceInfo: {
    year: "",
    round: "",
  },
};

const raceSlice = createSlice({
  name: "race",
  initialState,
  reducers: {
    setCurrentYearRaces(state, action: PayloadAction<Race[]>) {
      state.currentYearRaces = action.payload;
    },
    setSelectedRaceInfo(
      state,
      action: PayloadAction<{ year: string; round: string }>
    ) {
      state.selectedRaceInfo = action.payload;
    },
  },
});

export const { setCurrentYearRaces, setSelectedRaceInfo } = raceSlice.actions;
export default raceSlice.reducer;
