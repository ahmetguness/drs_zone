import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen from "../screens/IntroScreen/IntroScreen";
import AppBottomTabBarNavigation from "./AppBottomTabBarNavigation";

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
    </Stack.Navigator>
  );
};

export default AppStackNavigation;
