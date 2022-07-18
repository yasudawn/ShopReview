import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Platform ,StatusBar } from "react-native";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
/* components */
import { Form } from "../components/Form";
import { Button } from "../components/Button";
/* contexts */
import { UserContext } from "../contexts/userContext";

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
    const { user, setUser } = useContext(UserContext);
    // 名前を保存するためのステート
    const [name, setName] = useState<string>(user.name);

    useEffect(() => {});

    const onSubmit = async () => {
        // setLoading(true);
        // const updatedAt = firebase.firestore.Timestamp.now();
        // await updateUser(user.id, { name, updatedAt });
        // setUser({ ...user, name, updatedAt });
        // setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Form
             value={name}
             onChangeText={(text) => {
                setName(text);
             }} label="名前" />
             <Button onPress={onSubmit} text="保存する" />
        </SafeAreaView>
    );
};