import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DriverStandingsScreen from "../screens/DriverStandingsScreen/DriverStandingsScreen";
import TeamStandingsScreen from "../screens/TeamStandingsScreen/TeamStandingsScreen";
import CurrentWeekInfo from "../screens/CurrentWeekInfo/CurrentWeekInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ScheduleScreen from "../screens/ScheduleScreen/ScheduleScreen";

const Tab = createBottomTabNavigator();

const AppBottomTabBarNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CurrentWeekInfo"
        component={CurrentWeekInfo}
        options={{
          headerTitle: "The Race Ahead",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "skip-next" : "skip-next-outline"}
              size={size}
              color={color}
            />
          ),
          title: "The Race Ahead",
        }}
      />
      <Tab.Screen name="ScheduleScreen" component={ScheduleScreen} />
      <Tab.Screen
        name="DriverStandingsScreen"
        component={DriverStandingsScreen}
        options={{
          headerTitle: "Driver Standings",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "racing-helmet" : "racing-helmet"}
              size={size}
              color={color}
            />
          ),
          title: "Driver Standings",
        }}
      />
      <Tab.Screen
        name="TeamStandingsScreen"
        component={TeamStandingsScreen}
        options={{
          headerTitle: "Constructors Standings",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={size}
              color={color}
            />
          ),
          title: "Constructors Standings",
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTabBarNavigation;
