import { Session } from "../types/models/StandingModels/Sessions";

export const teamStandingData: { [key: string]: string } = {
  mclaren:
    "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/mclaren",
  mercedes:
    "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/mercedes",
  red_bull:
    "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/red%20bull",
  ferrari:
    "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/ferrari",
  williams:
    "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/williams",
  haas: "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/haas",
  aston_martin:
    "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/aston%20martin",
  rb: "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/fom-website/2018-redesign-assets/team%20logos/racing%20bulls",
  sauber:
    "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/kick%20sauber",
  alpine:
    "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/alpine",
};

export const circuitData: { [key: string]: { image: string; flag: string } } = {
  albert_park: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_771/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit",
    flag: "au",
  },
  shangai: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/China_Circuit",
    flag: "cn",
  },
  suzuka: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Japan_Circuit",
    flag: "jp",
  },
  bahrain: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit",
    flag: "bh",
  },
  jeddah: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Saudi_Arabia_Circuit",
    flag: "sa",
  },
  miami: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Miami_Circuit",
    flag: "us",
  },
  imola: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Emilia_Romagna_Circuit",
    flag: "it",
  },
  monaco: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Monaco_Circuit",
    flag: "mc",
  },
  montmelo: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Spain_Circuit",
    flag: "es",
  },
  gilles_villeneuve: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Canada_Circuit",
    flag: "ca",
  },
  red_bull_ring: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Austria_Circuit",
    flag: "at",
  },
  silverstone: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Great_Britain_Circuit",
    flag: "gb",
  },
  spa: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Belgium_Circuit",
    flag: "be",
  },
  hungaroring: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Hungary_Circuit",
    flag: "hu",
  },
  zandvoort: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Netherlands_Circuit",
    flag: "nl",
  },
  monza: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit",
    flag: "it",
  },
  baku: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Baku_Circuit",
    flag: "az",
  },
  marina_bay: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Singapore_Circuit",
    flag: "sg",
  },
  austin: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/USA_Circuit",
    flag: "us",
  },
  hermanos_rodriguez: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Mexico_Circuit",
    flag: "mx",
  },
  interlagos: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Brazil_Circuit",
    flag: "br",
  },
  vegas: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Las_Vegas_Circuit",
    flag: "us",
  },
  lusail: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Qatar_Circuit",
    flag: "qa",
  },
  yas_marina: {
    image:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Abu_Dhabi_Circuit",
    flag: "ae",
  },
};

export const getMainSessions = (hasSprint: boolean): Session[] => {
  if (hasSprint) {
    return [
      { id: "fp", name: "Free Practice" },
      { id: "sprint", name: "Sprint" },
      { id: "qualifying", name: "Qualifying" },
      { id: "race", name: "Race" },
    ];
  } else {
    return [
      { id: "fp", name: "Free Practices" },
      { id: "qualifying", name: "Qualifying" },
      { id: "race", name: "Race" },
    ];
  }
};

export const getPracticeSessions = (hasSprint: boolean): Session[] => {
  if (hasSprint) {
    return [{ id: "fp1", name: "FP1" }];
  } else {
    return [
      { id: "fp1", name: "FP1" },
      { id: "fp2", name: "FP2" },
      { id: "fp3", name: "FP3" },
    ];
  }
};

export const SPRINT_SESSIONS: Session[] = [
  { id: "sprintQuali", name: "Sprint Qualifying" },
  { id: "sprintRace", name: "Sprint Race" },
];
