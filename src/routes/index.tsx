import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

type StackNavigation = {
  Home: undefined;
  Profile: { item: object | null };
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

const Route = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default Route;
