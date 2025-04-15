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
  data: string;
}

interface Championship {
  championshipId: string;
  championshipName: string;
  url: string;
  year: number;
}
