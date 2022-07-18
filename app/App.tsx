import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
// 
import {getShops} from './src/lib/Firebase' 
import { Shop } from './src/types/Shop';
import { ShopReviewItem } from './src/components/ShopReviewItem';

// メイン
export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  // 
  useEffect(() => {
    getFirebaseItems();
  }, [])
  // Firestoreからデータを取得
  const getFirebaseItems = async() => {
    const MyShops =  await getShops();
    // shopsのステートへ入れる
    setShops(MyShops);
  }
    //---------------------------------------------------------------
    // 画面表示
    //---------------------------------------------------------------  
  const _renderItem =({item}:{item: Shop}) => {
    return <ShopReviewItem shop={item}  />
  }

  // 
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item}  />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
