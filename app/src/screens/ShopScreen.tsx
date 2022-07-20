import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Platform ,StatusBar ,Text, FlatList } from "react-native";
/* components */
import { ShopDetail } from "../components/ShopDetail";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { ReviewItem } from "../components/ReviewItem";
// Types
import { RootStackParamList } from "../types/navigation";
import { getReviews } from "../lib/Firebase";
import { Review } from "../types/review";

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
    // コンテキスト
    const [reviews, setReviews] = useState<Review[]>([]);
    
    //---------------------------------------------------------------
    // Shop変更時に実行
    //---------------------------------------------------------------
    useEffect(() => {
        // タイトルの設定
        navigation.setOptions({ title: shop.name });

        // レビューを取得
        const fetchReviews = async () => {
            const MyReviews = await getReviews(shop.id!);
            setReviews(MyReviews);
        };

        // 再描画
        //-----------------------------------------------------------
        const willFocusSubscription = navigation.addListener('focus', () => {
            fetchReviews();
        })
        fetchReviews();
    },[shop]);

    //---------------------------------------------------------------
    // 画面表示
    //---------------------------------------------------------------  
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ListHeaderComponent={<ShopDetail shop={shop} />}
                data={reviews}
                renderItem={({ item }) => <ReviewItem review={item} />}
                keyExtractor={(item) => item.id!}
              />
            <FloatingActionButton iconName="plus" onPress={() => navigation.navigate("CreateReview", { shop })} />
        </SafeAreaView>
    );
};