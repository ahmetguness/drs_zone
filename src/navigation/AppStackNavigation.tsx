import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen from "../screens/IntroScreen/IntroScreen";
import AppBottomTabBarNavigation from "./AppBottomTabBarNavigation";
import RaceDetailsScreen from "../screens/RaceDetailsScreen/RaceDetailsScreen";

const AppStackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="IntroScreen" component={IntroScreen} />
      <Stack.Screen name="HomeScreen" component={AppBottomTabBarNavigation} />
      <Stack.Screen
        name="RaceDetailsScreen"
        component={RaceDetailsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Race Details",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigation;
