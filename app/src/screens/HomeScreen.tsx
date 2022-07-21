//===================================================================
// インポート
//===================================================================
import React, { useEffect, useState } from "react";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, SafeAreaView ,Platform, StatusBar} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
/* lib */
import { getShops } from "../lib/Firebase";
/* components */
import { ShopReviewItem } from "../components/ShopReviewItem";
/* types */
import { Shop } from "../types/shop";

//===================================================================
// スタイルシート
//===================================================================
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      // Android 対応
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });

//===================================================================
// 表示画面
//===================================================================
// 受け渡すパラメータの型定義
type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};
// メイン処理
export const HomeScreen = ({navigation}:Props ) => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  // Firestoreからデータを取得
  const getFirebaseItems = async() => {
    const MyShops =  await getShops();
    // shopsのステートへ入れる
    setShops(MyShops);
  }

    //---------------------------------------------------------------
    // タップされた時の処理
    //---------------------------------------------------------------  
    const onPressShop = (shop: Shop) => {
        navigation.navigate("Shop", { shop });
    };

    //---------------------------------------------------------------
    // 画面表示
    //---------------------------------------------------------------  
    return (
    <SafeAreaView style={styles.container}>
        <ExpoStatusBar style="auto" />
        <FlatList
          data={shops}
          renderItem={({ item }: { item: Shop }) => (
              <ShopReviewItem shop={item} onPress={() => onPressShop(item)} />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
    </SafeAreaView>
    );
};
