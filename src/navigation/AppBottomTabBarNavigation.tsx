import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DriverStandingsScreen from "../screens/DriverStandingsScreen/DriverStandingsScreen";
import TeamStandingsScreen from "../screens/TeamStandingsScreen/TeamStandingsScreen";
import CurrentWeekInfo from "../screens/CurrentWeekInfo/CurrentWeekInfo";

const AppBottomTabBarNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CurrentWeekInfo"
        component={CurrentWeekInfo}
        options={{
          headerTitle: "Current Week Information",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="DriverStandingsScreen"
        component={DriverStandingsScreen}
        options={{
          headerTitle: "Driver Standings",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="TeamStandingsScreen"
        component={TeamStandingsScreen}
        options={{
          headerTitle: "Team Standings",
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTabBarNavigation;
