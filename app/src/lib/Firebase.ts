// firebase 
import * as firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore, collection, getDocs, doc,setDoc, Firestore, query, orderBy,where, getDoc } from 'firebase/firestore/lite';
import 'firebase/auth';
// 
import AsyncStorage from "@react-native-async-storage/async-storage"
// 型
import { Shop } from "../types/Shop";
import { User, initialUser } from "../types/user";
//
import Constants from "expo-constants"
import { addDoc, Timestamp } from "firebase/firestore";

let FirebaseApp:firebase.FirebaseApp;
let db:Firestore;
const initalizeFirebase = () => {
  if(!(FirebaseApp === void 0)) {return;}
  // Initialize Firebase
  FirebaseApp = initializeApp(Constants.manifest!.extra!.firebase);
  initializeAuth(FirebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage)
  })
  db = getFirestore(FirebaseApp);
}
initalizeFirebase();


//=================================================================
// Firestoreから店データを取得
//=================================================================
 export const getShops = async() => {
    const shopsRef = collection(db, 'Shops');
    // スコア順にソート
    const MyQ = query(shopsRef, orderBy("score", "desc"))
    //const MyQ = query(shopsRef,where("score", ">=", 4), orderBy("score", "desc"))
    // スナップショットを取得
    const snapshot = await getDocs(MyQ);
    // 店のデータを取得
    const MyShops =  snapshot.docs.map(doc => doc.data() as Shop);
    //console.log(MyShops)
    return MyShops;
}

//=================================================================
// サインイン
//=================================================================
export const signin = async () => {
  const auth = getAuth();
  const MyUser = signInAnonymously(auth);
  const RetUser = (await MyUser).user
  const userId = RetUser.uid;
  const usersRef = doc(db, 'Users', userId);
  const userDoc = await getDoc(usersRef)
  if (!userDoc.exists()) {
      const documentRef = await setDoc(usersRef, initialUser);
      //console.log('a'+SetUser);
     return {
       ...initialUser,
       id: userId,
     } as User;
  } else {
    const doc=userDoc.data()
    return {
       id: userId,
       ...doc
     } as User;
  }
};

//=================================================================
// ユーザーの更新
//=================================================================
export const updateUser = async (userId: string, params: any) => {
  const usersRef = doc(db, 'Users', userId);
  const userDoc = await getDoc(usersRef);
  //const doc=userDoc.data();

  const documentRef = await setDoc(usersRef, params);
};

// export const createReviewRef = async (shopId: string) => {
//   return await firebase
//     .firestore()
//     .collection("shops")
//     .doc(shopId)
//     .collection("reviews")
//     .doc();
// };
