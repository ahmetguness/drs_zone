import { Race } from "../types/models/StandingModels/CurrentYear";

export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const day = `${today.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getCurrentWeekRange = (): { start: Date; end: Date } => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const start = new Date(today);
  start.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export const filterRacesThisWeek = (races: Race[]): Race[] => {
  const { start, end } = getCurrentWeekRange();

  return races.filter((race) => {
    const raceDateStr = race.schedule?.race?.date;
    if (!raceDateStr) return false;

    const raceDate = new Date(raceDateStr);
    return raceDate >= start && raceDate <= end;
  });
};

export const getNextRace = (races: Race[]): Race | null => {
  const now = new Date();

  const upcomingRaces = races
    .filter((race) => {
      const dateStr = race.schedule?.race?.date;
      return dateStr && new Date(dateStr) > now;
    })
    .sort((a, b) => {
      const dateA = new Date(a.schedule.race.date ?? "");
      const dateB = new Date(b.schedule.race.date ?? "");
      return dateA.getTime() - dateB.getTime();
    });

  return upcomingRaces.length > 0 ? upcomingRaces[0] : null;
};
