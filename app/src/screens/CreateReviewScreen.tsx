import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Platform ,StatusBar ,Text } from "react-native";
/* components */
import { IconButton } from "../components/IconButton";
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
    navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
    route: RouteProp<RootStackParamList, "CreateReview">;
};

// Main
export const CreateReviewScreen: React.FC<Props> = ({ navigation, route }: Props) => {
    // 渡されたオブジェクト
    const { shop } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: shop.name,
            headerLeft: () => (
              <IconButton name="x" onPress={() => navigation.goBack()} />
            ),
          });
    }, [shop]);

    return (
        <SafeAreaView style={styles.container}>
                <Text>CreateReviewScreen</Text>
        </SafeAreaView>
    );
};