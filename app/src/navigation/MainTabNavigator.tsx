import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
/* screens */
import { HomeStackNavigator } from "./HomeStackNavigator";
import { UserScreen } from "../screens/UserScreen";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator 
        screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
        }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
            title: 'ホーム画面',
            tabBarIcon: ({ color, size }) => (
                <Feather name="home" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
            title: 'ユーザ画面',
            tabBarIcon: ({ color, size }) => (
                <Feather name="user" color={color} size={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};