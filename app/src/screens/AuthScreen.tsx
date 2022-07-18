import React, { useEffect, useContext } from "react";
import {StyleSheet, SafeAreaView, ActivityIndicator, Text,} from "react-native";
//import { signin, updateUser } from "../lib/firebase";
//import { registerForPushNotificationsAsync } from "../lib/notification";
//import { UserContext } from "../contexts/userContext";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      marginTop: 16,
      fontSize: 12,
      color: "#888",
    },
  });
  
export const AuthScreen: React.FC = () => {
    //---------------------------------------------------------------
    // 初期処理
    //---------------------------------------------------------------
    useEffect(() => {
    }, []);

    return (
    <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>ログイン中...</Text>
    </SafeAreaView>
    );
};

