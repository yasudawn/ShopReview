import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Platform ,StatusBar } from "react-native";
import { updateUser } from "../lib/Firebase";
/* components */
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
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
    const [name, setName] = useState<string>(user!.name);
    // ローディング中のステート
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {});

    const onSubmit = async () => {
        if(!user) {return;}
        // ローディング中を表示
        setLoading(true);
        const updatedAt = "";
        await updateUser(user.id || "", { name, updatedAt });
        setUser({ ...user, name, updatedAt });
        // ローディング中を非表示
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Form
             value={name}
             onChangeText={(text) => {
                setName(text);
             }} label="名前" />
             <Button onPress={onSubmit} text="保存する" />
             <Loading visible={loading} />
        </SafeAreaView>
    );
};