import { Driver, Team } from "./DriverStanding";

export interface RaceDetails {
  position: number;
  points: number | string;
  grid: number;
  time: string;
  fastLap: null;
  retired: null;
  driver: Driver & {
    driverId: string;
  };
  team: Team;
}

interface GeneralFp {
  driverId: string;
  teamId: string;
  time: null | string;
  driver: Driver & {
    driverId: string;
  };
  team: Team;
}
export interface Fp1 extends GeneralFp {
  fp1Id: string;
}
export interface Fp2 extends GeneralFp {
  fp2Id: string;
}
export interface Fp3 extends GeneralFp {
  fp3Id: string;
}
export interface Quali {
  classificationId: number;
  driverId: string;
  teamId: string;
  q1: string | null;
  q2: string | null;
  q3: string | null;
  gridPosition: number;
  driver: Driver & {
    driverId: string;
  };
  team: Team;
}

export interface SprintQuali {
  sprintQualyId: number;
  driverId: string;
  teamId: string;
  sq1: string | null;
  sq2: string | null;
  sq3: string | null;
  gridPosition: number;
  driver: Driver & {
    driverId: string;
  };
  team: Team;
}

export interface Sprint {
  sprintRaceId: number;
  driverId: string;
  teamId: string;
  position: number;
  gridPosition: number;
  points: number | string;
  driver: Driver & {
    driverId: string;
  };
  team: Team;
}
