interface Team {
  teamName: string;
  country: string;
  firstAppareance: number;
  constructorsChampionships: number;
  driversChampionships: number;
  url: string;
}

export interface TeamStanding {
  classificationId: number;
  teamId: string;
  points: number;
  position: number;
  wins: number;
  team: Team;
}
