import { Race } from "./CurrentYear";

export interface Response {
  api: string;
  url: string;
  limit: number;
  offset: number;
  total: number;
  season: string;
  championship: Championship;
  races: Race[];
}

interface Championship {
  championshipId: string;
  championshipName: string;
  url: string;
  year: number;
}
