import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Platform ,StatusBar ,Text } from "react-native";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // Android 対応
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "User">;
    route: RouteProp<RootStackParamList, "User">;
};

// Main
export const UserScreen: React.FC<Props> = ({ navigation, route }: Props) => {
    useEffect(() => {});

    return (
        <SafeAreaView style={styles.container}>
                <Text>UserScreen</Text>
        </SafeAreaView>
    );
};