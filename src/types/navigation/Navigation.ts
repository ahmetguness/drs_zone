import { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  IntroScreen: undefined;
  HomeScreen: undefined;
  RaceDetailsScreen: undefined;
};

export type BottomTabParamList = {
  DriverStandingsScreen: undefined;
  TeamStandingsScreen: undefined;
  CurrentWeekInfoScreen: undefined;
  ScheduleScreen: undefined;
};

export type GeneralNavigationProp = NavigationProp<RootStackParamList>;
export type BottomTabNavigationProp = NavigationProp<BottomTabParamList>;
