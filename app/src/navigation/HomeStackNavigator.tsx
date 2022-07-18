import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* screens */
import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
//import { CreateReviewScreen } from "../screens/CreateReviewScreen";
/* types */
//import { RootStackParamList } from "../types/navigation";

const Stack = createStackNavigator();
//const Stack = createStackNavigator<RootStackParamList>();
//const RootStack = createStackNavigator<RootStackParamList>();

export const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Shop" component={ShopScreen} />
        </Stack.Navigator>
    );
};