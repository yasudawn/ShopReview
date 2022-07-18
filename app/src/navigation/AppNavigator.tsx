import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
/* navigator */
//import { MainTabNavigator } from "./MainTabNavigator";
/* screens */
import { HomeStackNavigator } from "./HomeStackNavigator";
//import { AuthScreen } from "../screens/AuthScreen";
/* contexts */
//import { UserContext } from "../contexts/userContext";

export const AppNavigator = () => {
  //const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
        <HomeStackNavigator />
    </NavigationContainer>
  );
};