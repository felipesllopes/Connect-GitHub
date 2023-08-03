import { createDrawerNavigator } from "@react-navigation/drawer";
import Route from ".";
import React from "react";

const Drawer = createDrawerNavigator();

const DrawerRoute: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#000",
        drawerStyle: {
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="Route"
        component={Route}
        options={{ headerShown: false, title: "Início" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
