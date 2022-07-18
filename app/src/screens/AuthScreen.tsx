import React, { useEffect, useContext } from "react";
import {StyleSheet, SafeAreaView, ActivityIndicator, Text,} from "react-native";
import { UserContext } from "../contexts/userContext";
import { signin } from "../lib/Firebase";
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
  const { setUser } = useContext(UserContext);
    //---------------------------------------------------------------
    // 初期処理
    //---------------------------------------------------------------
    useEffect(() => {
        const fetchUser = async () => {
            const user = await signin();
            // // push通知のtokenを取得
            // const pushToken = await registerForPushNotificationsAsync();
            // if (pushToken && user.pushToken !== pushToken) {
            //   await updateUser(user.id, { pushToken });
            //   user.pushToken = pushToken;
            // }
            //console.log(user);
            setUser(user);
        };
        fetchUser();
    }, []);

    //---------------------------------------------------------------
    // 画面表示
    //---------------------------------------------------------------
    return (
    <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>ログイン中...</Text>
    </SafeAreaView>
    );
};

