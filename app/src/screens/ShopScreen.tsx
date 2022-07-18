import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Platform ,StatusBar ,Text } from "react-native";
/* components */
import { ShopDetail } from "../components/ShopDetail";
import { FloatingActionButton } from "../components/FloatingActionButton";
// Types
import { RootStackParamList } from "../types/navigation";

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
  });

//===================================================================
// 型定義
//===================================================================
// 引数型
type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Shop">;
    route: RouteProp<RootStackParamList, "Shop">;
};

// Main
export const ShopScreen: React.FC<Props> = ({navigation, route}:Props) => {
    // 渡されたオブジェクト
    const { shop } = route.params;
    //---------------------------------------------------------------
    // Shop変更時に実行
    //---------------------------------------------------------------
    useEffect(() => {
        // タイトルの設定
        navigation.setOptions({ title: shop.name });
    },[shop]);

    //---------------------------------------------------------------
    // 画面表示
    //---------------------------------------------------------------  
    return (
        <SafeAreaView style={styles.container}>
            <ShopDetail shop={shop} />
            <FloatingActionButton iconName="plus" onPress={() => navigation.navigate("CreateReview", { shop })} />
        </SafeAreaView>
    );
};