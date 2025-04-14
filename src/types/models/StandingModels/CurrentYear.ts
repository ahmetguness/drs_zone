interface RaceScheduleItem {
  date: string | null;
  time: string | null;
}

interface RaceSchedule {
  race: RaceScheduleItem;
  qualy: RaceScheduleItem;
  fp1: RaceScheduleItem;
  fp2: RaceScheduleItem;
  fp3: RaceScheduleItem;
  sprintQualy: RaceScheduleItem;
  sprintRace: RaceScheduleItem;
}

interface FastLap {
  fast_lap: string;
  fast_lap_driver_id: string;
  fast_lap_team_id: string;
}

interface Circuit {
  circuitId: string;
  circuitName: string;
  country: string;
  city: string;
  circuitLength: string;
  lapRecord: string;
  firstParticipationYear: number;
  corners: number;
  fastestLapDriverId: string;
  fastestLapTeamId: string;
  fastestLapYear: number;
  url: string;
}

interface Driver {
  driverId: string;
  name: string;
  surname: string;
  country: string;
  birthday: string;
  number: number;
  shortName: string;
  url: string;
}

interface Team {
  teamId: string;
  teamName: string;
  country: string;
  firstAppearance: number;
  constructorsChampionships: number;
  driversChampionships: number;
  url: string;
}

export interface Race {
  raceId: string;
  championshipId: string;
  raceName: string;
  schedule: RaceSchedule;
  laps: number;
  round: number;
  url: string;
  fast_lap: FastLap;
  circuit: Circuit;
  winner: Driver;
  teamWinner: Team;
}
