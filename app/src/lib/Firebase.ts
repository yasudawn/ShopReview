// firebase 
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore, collection, getDocs, doc,setDoc, Firestore } from 'firebase/firestore/lite';
// 
import AsyncStorage from "@react-native-async-storage/async-storage"
// 型
import { Shop } from "../types/Shop";
//
import Constants from "expo-constants"

let FirebaseApp;
let db:Firestore;
const initalizeFirebase = () => {
  // Initialize Firebase
  FirebaseApp = initializeApp(Constants.manifest!.extra!.firebase);
  initializeAuth(FirebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage)
  })
  db = getFirestore(FirebaseApp);
}
initalizeFirebase();


  // Firestoreから店データを取得
 export const getShops = async() => {
    const shopsCol = collection(db, 'Shops');
    const snapshot = await getDocs(shopsCol);
    const MyShops =  snapshot.docs.map(doc => doc.data() as Shop);
    console.log(MyShops)
    return MyShops;


    // 更新テスト
    // const a=doc(db,"Shops","1");
    // await setDoc(a, {
    //   name: "ビストロ品川1号店",
    //   place: "品川",
    // });
}