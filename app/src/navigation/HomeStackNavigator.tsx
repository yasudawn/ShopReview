//===================================================================
// インポート
//===================================================================
import React from "react";
import { createStackNavigator,TransitionPresets } from "@react-navigation/stack";
/* screens */
import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
import { CreateReviewScreen } from "../screens/CreateReviewScreen";
/* types */
import { RootStackParamList } from "../types/navigation";

//
const Stack = createStackNavigator<RootStackParamList>();
const ModalStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "#000",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Shop" component={ShopScreen} />
      </Stack.Navigator>
    );
  };
  
  export const HomeStackNavigator = () => (
    <ModalStack.Navigator
        screenOptions={{
            headerShown: false,
            /* Android用 モーダル設定*/
            gestureEnabled: true,
            cardOverlayEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
            /* Android用 ここまで */
            }}>
      <ModalStack.Screen
        name="Main"
        component={MainStack}
        options={{ 
            presentation: 'modal',
         }}
      />
      <ModalStack.Screen
        name="CreateReview" 
        component={CreateReviewScreen}
        options={{
            headerShown: true,
        }} />
    </ModalStack.Navigator>
  );