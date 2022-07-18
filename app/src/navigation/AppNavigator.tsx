import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
/* navigator */
//import { MainTabNavigator } from "./MainTabNavigator";
/* screens */
import { MainTabNavigator } from "./MainTabNavigator";
//import { AuthScreen } from "../screens/AuthScreen";
/* contexts */
//import { UserContext } from "../contexts/userContext";

export const AppNavigator = () => {
  //const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
        <MainTabNavigator />
    </NavigationContainer>
  );
};