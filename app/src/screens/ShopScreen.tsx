import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Platform ,StatusBar ,Text } from "react-native";

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
};

// Main
export const ShopScreen: React.FC<Props> = () => {
    useEffect(() => {});

    return (
        <SafeAreaView style={styles.container}>
            <Text>MyScreen</Text>
        </SafeAreaView>
    );
};