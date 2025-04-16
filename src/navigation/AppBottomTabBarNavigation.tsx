import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Alert } from "react-native";
import DriverStandingsScreen from "../screens/DriverStandingsScreen/DriverStandingsScreen";
import TeamStandingsScreen from "../screens/TeamStandingsScreen/TeamStandingsScreen";
import CurrentWeekInfo from "../screens/CurrentWeekInfoScreen/CurrentWeekInfoScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ScheduleScreen from "../screens/ScheduleScreen/ScheduleScreen";

const Tab = createBottomTabNavigator();

const AppBottomTabBarNavigation = () => {
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const handleNotificationToggle = () => {
    if (!isNotificationOn) {
      Alert.alert(
        "Enable Notifications",
        "Are you sure you want to enable notifications?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              setIsNotificationOn(true);
              console.log("Notification toggled: ON");
            },
          },
        ]
      );
    } else {
      setIsNotificationOn(false);
      console.log("Notification toggled: OFF");
    }
  };

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
          headerRight: () => (
            <TouchableOpacity
              onPress={handleNotificationToggle}
              style={{ marginRight: 15 }}
            >
              <Ionicons
                name={isNotificationOn ? "notifications" : "notifications-off"}
                size={24}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{
          headerTitle: "Schedule",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          ),
          title: "Schedule",
        }}
      />
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
