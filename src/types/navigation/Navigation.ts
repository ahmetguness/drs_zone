import { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  IntroScreen: undefined;
  HomeScreen: undefined;
};

export type BottomTabParamList = {
  DriverStandingsScreen: undefined;
  TeamStandingsScreen: undefined;
};

export type GeneralNavigationProp = NavigationProp<RootStackParamList>;
export type BottomTabNavigationProp = NavigationProp<BottomTabParamList>;
