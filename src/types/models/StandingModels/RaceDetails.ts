import { Driver, Team } from "./DriverStanding";

export interface RaceDetails {
  position: number;
  points: number | string;
  grid: number;
  time: string;
  fastLap: null;
  retired: null;
  driver: Driver;
  extented: {
    driverId: string;
  };
  team: Team;
}
