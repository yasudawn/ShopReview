import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
/* navigator */
//import { MainTabNavigator } from "./MainTabNavigator";
/* screens */
import { HomeScreen } from "../screens/HomeScreen";
//import { AuthScreen } from "../screens/AuthScreen";
/* contexts */
//import { UserContext } from "../contexts/userContext";

export const AppNavigator = () => {
  //const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
        <HomeScreen />
    </NavigationContainer>
  );
};