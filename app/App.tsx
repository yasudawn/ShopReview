import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
// firebase 
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore, collection, getDocs, doc,setDoc, Firestore } from 'firebase/firestore/lite';
// 
import AsyncStorage from "@react-native-async-storage/async-storage"
import {getShops} from './src/lib/Firebase' 
import { Shop } from './src/types/Shop';

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
  //
  const shopItems = shops.map((shopItem, index) => (
    <View style={{margin:10}} key={index.toString()}>
      <Text>{shopItem.name}</Text>
      <Text>{shopItem.place}</Text>
    </View>
  ))
  // 
  return (
    <View style={styles.container}>
      {shopItems}
      <StatusBar style="auto" />
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
