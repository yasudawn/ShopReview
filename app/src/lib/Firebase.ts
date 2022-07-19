// firebase 
import * as firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore, collection, getDocs, doc,setDoc, Firestore, query, orderBy,where, getDoc,addDoc,Timestamp, updateDoc } from 'firebase/firestore';
import 'firebase/auth';
// 
import AsyncStorage from "@react-native-async-storage/async-storage"
// 型
import { Shop } from "../types/Shop";
import { User, initialUser } from "../types/user";
//
import Constants from "expo-constants"

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


class DbUser {
  name: string;
  updatedAt:Timestamp = Timestamp.now();
  createdAt:Timestamp = Timestamp.now();
  constructor (name:string) {
      this.name = name;
      //this.updatedAt = Timestamp;
      //this.createdAt = Timestamp;
}
  toString() {
      return this.name;
  }
}

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
    const MyShops =  snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Shop));
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
    await updateDoc(usersRef, params);
};

//=================================================================
// レビューの投稿
//=================================================================
export const createReviewRef = async (shopId: string) => {
  const shopRef = doc(db, 'Shops', shopId);
  const shopDoc = await getDoc(shopRef);
  try {
    //await setDoc(doc(shopRef, 'Reviews',"1"), initialUser);
    return await addDoc(collection(shopRef, 'Reviews'),{});
  } catch (err) {
    alert(err)
  }
  //console.log(reviewDoc);
  return null;

  //return reviewDoc;
};
