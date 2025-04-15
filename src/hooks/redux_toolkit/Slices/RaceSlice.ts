import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Race } from "../../../types/models/StandingModels/CurrentYear";
import { Circuit } from "../../../types/models/StandingModels/CurrentYear";

interface RaceState {
  currentYearRaces: Race[];
  selectedRaceInfo: {
    year: string;
    round: string;
    circuitInfo: Circuit;
  };
}

const initialState: RaceState = {
  currentYearRaces: [],
  selectedRaceInfo: {
    year: "",
    round: "",
    circuitInfo: {} as Circuit,
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
      action: PayloadAction<{
        year: string;
        round: string;
        circuitInfo: Circuit;
      }>
    ) {
      state.selectedRaceInfo = action.payload;
    },
  },
});

export const { setCurrentYearRaces, setSelectedRaceInfo } = raceSlice.actions;
export default raceSlice.reducer;
