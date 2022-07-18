import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
/* lib */
import { getShops } from "../lib/Firebase";
/* components */
import { ShopReviewItem } from "../components/ShopReviewItem";
/* types */
import { Shop } from "../types/shop";
import { StackNavigationProp } from "@react-navigation/stack";
//import { RootStackParamList } from "../types/navigation";

type Props = {
//  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen = ({  }: Props) => {
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
    // 画面表示(未使用)
    //---------------------------------------------------------------  
    const _renderItem =({item}:{item: Shop}) => {
        return <ShopReviewItem shop={item}  />
      }
    

  const onPressShop = (shop: Shop) => {
    // navigation.navigate("Shop", { shop });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item}  />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});